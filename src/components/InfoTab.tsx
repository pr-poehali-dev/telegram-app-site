import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface InfoTabProps {
  users: number;
  efficiency: number;
}

export const InfoTab = ({ users, efficiency }: InfoTabProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Users" className="text-primary" size={24} />
              Защищено пользователей
            </CardTitle>
            <CardDescription>Растёт каждый день</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold gradient-text">{users}+</p>
          </CardContent>
        </Card>

        <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" className="text-primary" size={24} />
              Эффективность
            </CardTitle>
            <CardDescription>Успешно заблокировано утечек</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold gradient-text">{efficiency}%</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Shield" className="text-primary" size={24} />
            О сервисе AntiSherlok
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Icon name="Lock" className="text-primary mt-1" size={20} />
              <div>
                <h3 className="font-semibold mb-1">Полная защита данных</h3>
                <p className="text-sm text-muted-foreground">
                  Блокируем все каналы утечки персональных данных в режиме 24/7
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Icon name="Bell" className="text-primary mt-1" size={20} />
              <div>
                <h3 className="font-semibold mb-1">Мгновенные уведомления</h3>
                <p className="text-sm text-muted-foreground">
                  Получайте уведомления о попытках доступа к вашим данным
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Icon name="BarChart" className="text-primary mt-1" size={20} />
              <div>
                <h3 className="font-semibold mb-1">Аналитика угроз</h3>
                <p className="text-sm text-muted-foreground">
                  Подробные отчеты о защите с рекомендациями по безопасности
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Icon name="MessageCircle" className="text-primary mt-1" size={20} />
              <div>
                <h3 className="font-semibold mb-1">Поддержка 24/7</h3>
                <p className="text-sm text-muted-foreground">
                  Наша команда всегда готова помочь с любыми вопросами
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-primary/20 bg-gradient-to-br from-primary/10 via-background/80 to-secondary/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Zap" className="text-primary" size={24} />
            Преимущества
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Icon name="Check" className="text-primary mt-0.5" size={18} />
              <span>Автоматическое обнаружение угроз в реальном времени</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" className="text-primary mt-0.5" size={18} />
              <span>Защита от пробива по номеру телефона и другим данным</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" className="text-primary mt-0.5" size={18} />
              <span>Мониторинг всех публичных баз данных</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" className="text-primary mt-0.5" size={18} />
              <span>Простая интеграция с Telegram</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" className="text-primary mt-0.5" size={18} />
              <span>Доступные цены и гибкие тарифы</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
