import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Subscription {
  id: number;
  plan: string;
  price?: string;
  duration?: number;
  startDate?: string;
  endDate?: string;
  status: string;
  date: string;
}

interface PurchasesTabProps {
  subscriptions: Subscription[];
}

export const PurchasesTab = ({ subscriptions }: PurchasesTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {subscriptions.map((sub) => (
        <Card 
          key={sub.id}
          className="border border-primary/20 bg-background/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{sub.plan}</CardTitle>
              <Badge 
                variant={sub.status === 'active' ? 'default' : 'secondary'}
                className={sub.status === 'active' ? 'bg-primary' : ''}
              >
                {sub.status === 'active' ? (
                  <>
                    <Icon name="CheckCircle" size={14} className="mr-1" />
                    Активна
                  </>
                ) : (
                  'Нет данных'
                )}
              </Badge>
            </div>
            <CardDescription>Оформлена: {sub.date}</CardDescription>
          </CardHeader>
          {sub.startDate && sub.endDate && (
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Начало:</span>
                  <span className="font-medium">{sub.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Окончание:</span>
                  <span className="font-medium">{sub.endDate}</span>
                </div>
                {sub.price && (
                  <div className="flex justify-between pt-2 border-t border-primary/20">
                    <span className="text-muted-foreground">Стоимость:</span>
                    <span className="font-bold text-primary">{sub.price}</span>
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};
