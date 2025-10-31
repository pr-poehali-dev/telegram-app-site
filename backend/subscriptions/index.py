'''
Business: Manage user subscriptions and purchases for AntiSherlok bot
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with request_id, function_name attributes
Returns: HTTP response with subscription data
'''

import json
import os
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            telegram_id = params.get('telegram_id')
            
            if not telegram_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'telegram_id required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "SELECT id FROM users WHERE telegram_id = %s",
                (int(telegram_id),)
            )
            user = cursor.fetchone()
            
            if not user:
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'subscriptions': []}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                """SELECT id, plan_name, price, duration_months, start_date, end_date, status, created_at
                   FROM subscriptions 
                   WHERE user_id = %s 
                   ORDER BY created_at DESC""",
                (user['id'],)
            )
            subscriptions = cursor.fetchall()
            
            result = []
            for sub in subscriptions:
                result.append({
                    'id': sub['id'],
                    'plan': sub['plan_name'],
                    'price': sub['price'],
                    'duration': sub['duration_months'],
                    'startDate': sub['start_date'].isoformat() if sub['start_date'] else None,
                    'endDate': sub['end_date'].isoformat() if sub['end_date'] else None,
                    'status': sub['status'],
                    'date': sub['created_at'].strftime('%d.%m.%Y') if sub['created_at'] else None
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'subscriptions': result}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            telegram_id = body_data.get('telegram_id')
            plan_name = body_data.get('plan_name')
            price = body_data.get('price')
            duration_months = body_data.get('duration_months')
            username = body_data.get('username', '')
            first_name = body_data.get('first_name', '')
            last_name = body_data.get('last_name', '')
            
            if not all([telegram_id, plan_name, price, duration_months]):
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Missing required fields'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                """INSERT INTO users (telegram_id, username, first_name, last_name, updated_at)
                   VALUES (%s, %s, %s, %s, CURRENT_TIMESTAMP)
                   ON CONFLICT (telegram_id) 
                   DO UPDATE SET username = EXCLUDED.username, 
                                 first_name = EXCLUDED.first_name,
                                 last_name = EXCLUDED.last_name,
                                 updated_at = CURRENT_TIMESTAMP
                   RETURNING id""",
                (int(telegram_id), username, first_name, last_name)
            )
            user = cursor.fetchone()
            user_id = user['id']
            
            start_date = datetime.now()
            end_date = start_date + timedelta(days=30 * duration_months)
            
            cursor.execute(
                """INSERT INTO subscriptions 
                   (user_id, plan_name, price, duration_months, start_date, end_date, status)
                   VALUES (%s, %s, %s, %s, %s, %s, %s)
                   RETURNING id, created_at""",
                (user_id, plan_name, price, duration_months, start_date, end_date, 'active')
            )
            subscription = cursor.fetchone()
            
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'subscription_id': subscription['id'],
                    'end_date': end_date.isoformat()
                }),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cursor.close()
        conn.close()
