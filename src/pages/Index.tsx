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
  const [users, setUsers] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const animateCounter = (target: number, setter: (val: number) => void, duration: number = 2000) => {
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 16);
      
      return timer;
    };

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

    const timer1 = setTimeout(() => animateCounter(150, setUsers), 500);
    const timer2 = setTimeout(() => animateCounter(100, setEfficiency), 700);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}} />
        </div>
        <div className="text-center space-y-8 px-4 relative z-10">
          <div className="relative">
            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 blur-3xl absolute top-0 left-1/2 transform -translate-x-1/2 animate-glow" />
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
              <div className="absolute w-40 h-40 rounded-full border-4 border-primary/30 border-t-primary border-r-secondary animate-spin-slow" />
              <div className="absolute w-32 h-32 rounded-full border-4 border-secondary/30 border-b-secondary border-l-primary animate-spin-slow" style={{animationDirection: 'reverse', animationDuration: '2s'}} />
              <div className="relative bg-card/80 backdrop-blur-sm rounded-full p-6 border-2 border-primary/50">
                <Icon name="Shield" className="text-primary animate-pulse" size={52} />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-5xl font-bold gradient-text animate-fade-in mb-2">AntiSherlok</h2>
              <p className="text-sm text-muted-foreground/80">Система защиты данных</p>
            </div>
            <div className="w-96 max-w-full mx-auto space-y-3">
              <div className="h-2 bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm border border-primary/20 shadow-lg">
                <div 
                  className="h-full bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-500 ease-out relative overflow-hidden"
                  style={{ width: `${loadingProgress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <p className="text-muted-foreground font-medium">Инициализация модулей защиты</p>
                <p className="text-primary font-bold">{loadingProgress}%</p>
              </div>
            </div>
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
                <div className="text-center p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 cursor-default">
                  <Icon name="Users" className="mx-auto mb-2 text-primary" size={32} />
                  <div className="text-2xl font-bold">{users}+</div>
                  <div className="text-sm">Защищённых пользователей</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 hover:scale-105 cursor-default">
                  <Icon name="ShieldCheck" className="mx-auto mb-2 text-secondary" size={32} />
                  <div className="text-2xl font-bold">{efficiency}%</div>
                  <div className="text-sm">Эффективность</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 cursor-default">
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