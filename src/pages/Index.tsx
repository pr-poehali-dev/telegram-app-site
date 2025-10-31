import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import func2url from '../../backend/func2url.json';

interface Subscription {
  id: number;
  plan: string;
  price: string;
  duration: number;
  startDate: string;
  endDate: string;
  status: string;
  date: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [userSubscriptions, setUserSubscriptions] = useState<Subscription[]>([]);
  const [telegramId] = useState('123456789');
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            loadSubscriptions();
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const loadSubscriptions = async () => {
    try {
      const response = await fetch(
        `${func2url.subscriptions}?telegram_id=${telegramId}`
      );
      const data = await response.json();
      setUserSubscriptions(data.subscriptions || []);
    } catch (error) {
      console.error('Failed to load subscriptions:', error);
    }
  };

  const handleSubscribe = async (planName: string, price: string, durationMonths: number) => {
    try {
      const response = await fetch(func2url.subscriptions, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegram_id: telegramId,
          plan_name: planName,
          price: price,
          duration_months: durationMonths,
          username: 'demo_user',
          first_name: 'Demo',
          last_name: 'User'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Подписка активирована!',
          description: `Подписка "${planName}" успешно оформлена`,
        });
        await loadSubscriptions();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось оформить подписку',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="text-center space-y-8 px-4">
          <div className="relative">
            <div className="w-24 h-24 mx-auto rounded-full border-4 border-primary/20 border-t-primary animate-spin-slow" />
            <Icon name="Shield" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary" size={40} />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold gradient-text">AntiSherlok</h2>
            <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
              <div 
                className="h-full gradient-primary transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-muted-foreground">Загрузка {loadingProgress}%</p>
          </div>
        </div>
      </div>
    );
  }

  const subscriptionPlans = [
    {
      name: '1 месяц',
      price: '69₽',
      duration: 'месяц',
      durationMonths: 1,
      features: [
        'Полная защита данных',
        'Мониторинг 24/7',
        'Уведомления в реальном времени',
        'Техническая поддержка'
      ],
      popular: false
    },
    {
      name: '3 месяца',
      price: '207₽',
      duration: '3 месяца',
      durationMonths: 3,
      features: [
        'Полная защита данных',
        'Мониторинг 24/7',
        'Уведомления в реальном времени',
        'Приоритетная поддержка',
        'Расширенная аналитика'
      ],
      popular: true
    },
    {
      name: '6 месяцев',
      price: '414₽',
      duration: '6 месяцев',
      durationMonths: 6,
      features: [
        'Полная защита данных',
        'Мониторинг 24/7',
        'Уведомления в реальном времени',
        'VIP поддержка',
        'Расширенная аналитика',
        'Персональный менеджер'
      ],
      popular: false
    },
    {
      name: '12 месяцев',
      price: '828₽',
      duration: '1 год',
      durationMonths: 12,
      features: [
        'Полная защита данных',
        'Мониторинг 24/7',
        'Уведомления в реальном времени',
        'VIP поддержка',
        'Расширенная аналитика',
        'Персональный менеджер',
        'Максимальная выгода'
      ],
      popular: false
    }
  ];

  const displayPurchases = userSubscriptions.length > 0 ? userSubscriptions : [
    { id: 1, plan: 'Нет активных подписок', date: '-', status: 'Нет данных' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="container mx-auto relative z-10">
          <div className="text-center space-y-6 animate-fade-in">
            <Badge variant="outline" className="border-primary/50 text-primary text-base px-4 py-2">
              <Icon name="Sparkles" size={18} className="mr-2" />
              Популярное: 3 месяца всего за 207₽!
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold gradient-text">
              AntiSherlok
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Уникальный бот для борьбы с недобросовестными пользователями
            </p>
            <Button 
              size="lg" 
              className="gradient-primary text-white hover:opacity-90 transition-opacity animate-glow"
              onClick={() => window.open('https://t.me/antiSherlok_snosBot', '_blank')}
            >
              <Icon name="Send" size={20} className="mr-2" />
              Открыть бота
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold">О боте</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Защитите свои данные от недобросовестных пользователей
            </p>
          </div>
          <Card className="max-w-4xl mx-auto border-primary/20 bg-card/80 backdrop-blur animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Icon name="Info" className="text-primary" size={28} />
                Что такое AntiSherlok?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                AntiSherlok — это уникальный бот, разработанный для борьбы с недобросовестными пользователями, 
                которые используют пробив ботов, такие как Шерлок, для получения личной информации о других людях.
              </p>
              <p>
                Основная задача AntiSherlok-а — выявление и блокировка таких пользователей, а также защита 
                конфиденциальности и безопасности данных.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 rounded-lg bg-primary/10">
                  <Icon name="Users" className="mx-auto mb-2 text-primary" size={32} />
                  <div className="text-2xl font-bold">10,000+</div>
                  <div className="text-sm">Защищённых пользователей</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/10">
                  <Icon name="ShieldCheck" className="mx-auto mb-2 text-secondary" size={32} />
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-sm">Эффективность</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/10">
                  <Icon name="Clock" className="mx-auto mb-2 text-primary" size={32} />
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Мониторинг</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold">Тарифные планы</h2>
            <p className="text-muted-foreground">
              Выберите подходящий план защиты
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {subscriptionPlans.map((plan, index) => (
              <Card 
                key={plan.name}
                className={`relative hover:scale-105 transition-transform duration-300 ${
                  plan.popular 
                    ? 'border-primary shadow-lg shadow-primary/20 animate-glow' 
                    : 'border-primary/20'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-primary text-white">
                    Популярный
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground"> / {plan.duration}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'gradient-primary text-white hover:opacity-90' 
                        : 'border-primary/50 hover:bg-primary/10'
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handleSubscribe(plan.name, plan.price, plan.durationMonths)}
                  >
                    <Icon name="CreditCard" size={18} className="mr-2" />
                    Подключить
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold">История покупок</h2>
            <p className="text-muted-foreground">
              Ваши активные и прошлые подписки
            </p>
          </div>
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                {displayPurchases.map((purchase) => (
                  <div 
                    key={purchase.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        purchase.status === 'active' || purchase.status === 'Активна' ? 'bg-green-500' : 'bg-muted-foreground'
                      }`} />
                      <div>
                        <div className="font-semibold">{purchase.plan}</div>
                        <div className="text-sm text-muted-foreground">{purchase.date}</div>
                      </div>
                    </div>
                    <Badge variant={purchase.status === 'active' || purchase.status === 'Активна' ? 'default' : 'secondary'}>
                      {purchase.status === 'active' ? 'Активна' : purchase.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Icon name="Shield" className="text-primary" size={20} />
            © 2024 AntiSherlok. Защита ваших данных — наш приоритет
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;