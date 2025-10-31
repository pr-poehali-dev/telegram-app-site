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

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

type TabType = 'subscriptions' | 'purchases' | 'info';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [userSubscriptions, setUserSubscriptions] = useState<Subscription[]>([]);
  const [telegramId] = useState('123456789');
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [users, setUsers] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>('subscriptions');
  const { toast } = useToast();

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      setTelegramUser(tg.initDataUnsafe.user);
    }
  }, []);

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
          const completeAudio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYmMj5KVmJuepqmsr7K1t7q9wMPFyMrNz9HU1tjZ297g4uTm6Onr7e7w8fP09fb4+fr7/P3+/v////7+/fz7+vn4+PX08/Lw7+7s6+no5uTi4N7c29nX1dPRz83Ly8jGxMK/vLq3tbKwraqop6ShnpuYlZOQjYqHhIF+e3h1c3BubGpmY2BdXFlWU1BOTA8MCQYDAAABAwYJDA8SFRgbHiElKC0wMzY5PEFES0hLTlFUV1pcX2JlZ2psbm9xc3R2eHl7fX5/gIGCg4SFhoaHh4iIiYmJiYqKioqKioqKiomJiYiIh4aGhYSEg4KBgH9+fXt6eXd2dHJxbm1ramdlY2BdW1hVUlBNSkdEQj46Nzg1MjAvKykoJSEeGxgVEg8MCQYDAAABAwYJDA8SFRgbHiElKC0wMzY5PEFES0hLTlFUV1pcX2JlZ2psbm9xc3R2eHl7fX5/gIGCg4SFhoaHh4iIiYmJiYqKioqKioqKiomJiYiIh4aGhYSEg4KBgH9+fXt6eXd2dHJxbm1ramdlY2BdW1hVUlBNSkdEQj06Nzg1MjAvKykoJSEeGxgVEg8MCQYDAAABAwYJDA8SFRgbHiElKC0wMzY5PEFES0hLTlFUV1pcX2JlZ2psbm9xc3R2eHl7fX5/gIGCg4SFhoaHh4iIiYmJiYqKioqKioqKiomJiYiIh4aGhYSEg4KBgH9+fXt6eXd2dHJxbm1ramdlY2BdW1hVUlBNSkdEQj06Nzg1MjAvKykoJSEeGxgVEg8MCQYDAAABAwYJDA8SFRgbHiElKC0wMzY5PEFES0hLTlFUV1pcX2JlZ2psbm9xc3R2eHl7fX5/gIGCg4SFhoaHh4iIiYmJiYqKioqKioqKiomJiYiIh4aGhYSEg4KBgH9+fXt6eXd2dHJxbm1ramdlY2BdW1hVUlBNSkdEQj06Nzg1MjAvKykoJSEeGxgVEg8MCQYDAAABAwYJDA8SFRgbHiElKC0wMzY5PEFES0hLTlFUV1pcX2JlZ2psbm9xc3R2eHl7fX5/gIGCg4SFhoaHh4iIiYmJiYqKioqKioqKiomJiYiIh4aGhYSEg4KBgH9+fXt6eXd2dHJxbm1ramdlY2BdW1hVUlBNSkdEQj06Nzg1MjAvKykoJSEeGxgVEg8MCQYDAAABAwYJDA8SFRgbHiElKC0wMzY5PEFES0hLTlFUV1pcX2JlZ2psbm9xc3R2eHl7fX5/gIGCg4SFhoaHh4iIiYmJiYqKioqKioqKiomJiYiIh4aGhYSEg4KBgH9+fXt6eXd2dHJxbm1ramdlY2BdW1hVUlBNSkdEQj06Nzg1MjAvKykoJSEeGxgVEg8MCQYDAAABAwYJDA8SFRgbHiElKC0wMzY5PEFES0hLTlFUV1pcX2JlZ2psbm9xc3R2eHl7fX5/gIGCg4SFhoaHh4iIiYmJiYqKioqKioqKiomJiYiIh4aGhYSEg4KBgH9+fXt6eXd2dHJxbm1ramdlY2BdW1hVUlBNSkdEQj06');
          completeAudio.volume = 0.3;
          completeAudio.play().catch(() => {});
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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 space-y-6">
        {telegramUser && (
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-background/80 to-secondary/10 backdrop-blur-xl border border-primary/20">
            {telegramUser.photo_url ? (
              <img 
                src={telegramUser.photo_url} 
                alt="Avatar" 
                className="w-16 h-16 rounded-full border-2 border-primary/50"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center">
                <Icon name="User" size={32} className="text-primary" />
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">
                {telegramUser.first_name} {telegramUser.last_name || ''}
              </h2>
              {telegramUser.username && (
                <p className="text-muted-foreground">@{telegramUser.username}</p>
              )}
            </div>
          </div>
        )}
        <section className="relative overflow-hidden py-12 px-6 rounded-3xl bg-gradient-to-br from-primary/20 via-background/80 to-secondary/20 backdrop-blur-xl border border-primary/20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
          <div className="relative z-10 text-center space-y-6">
            <Badge variant="outline" className="border-primary/50 text-primary text-base px-4 py-2 bg-background/50 backdrop-blur-sm">
              <Icon name="Sparkles" size={18} className="mr-2" />
              Популярное: 3 месяца всего за 207₽!
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold gradient-text">
              AntiSherlok
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Уникальный бот для борьбы с недобросовестными пользователями
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="gradient-primary text-white hover:opacity-90 transition-opacity animate-glow"
                onClick={() => {
                  const powerAudio = new Audio('data:audio/wav;base64,UklGRiQEAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAEAAB/f39/f4CAgICBgYGBgoKCgoODg4OEhISEhYWFhYaGhoaHh4eHiIiIiImJiYmKioqKi4uLi4yMjIyNjY2Njo6Ojo+Pj4+QkJCQkZGRkZKSkpKTk5OTlJSUlJWVlZWWlpaWl5eXl5iYmJiZmZmZmpqampubm5ucnJycnZ2dnZ6enp6fn5+foKCgoKGhoaGioqKio6Ojo6SkpKSlpaWlpqampqenp6eoqKioqampqaqqqqqrq6urrKysrK2tra2urq6ur6+vr7CwsLCxsbGxsrKysrOzs7O0tLS0tbW1tbW2tra3t7e3uLi4uLm5ubm6urq6u7u7u7y8vLy9vb29vr6+vr+/v7/AwMDAwcHBwcLCwsLDw8PDxMTExMXFxcXGxsbGx8fHx8jIyMjJycnJysrKysvLy8vMzMzMzc3Nzc7Ozs7Pz8/P0NDQ0NHR0dHS0tLS09PT09TU1NTV1dXV1tbW1tfX19fY2NjY2dnZ2dra2trb29vb3Nzc3N3d3d3e3t7e39/f3+Dg4ODh4eHh4uLi4uPj4+Pk5OTk5eXl5ebm5ubn5+fn6Ojo6Onp6enq6urq6+vr6+zs7Ozt7e3t7u7u7u/v7+/w8PDw8fHx8fLy8vLz8/Pz9PT09PX19fX29vb29/f39/j4+Pj5+fn5+vr6+vv7+/v8/Pz8/f39/f7+/v7///////////7+/v79/f39/Pz8/Pv7+/v6+vr6+fn5+fj4+Pj39/f39vb29vX19fX09PT08/Pz8/Ly8vLx8fHx8PDw8O/v7+/u7u7u7e3t7ezs7Ozr6+vr6urq6unp6eno6Ojo5+fn5+bm5ubl5eXl5OTk5OPj4+Pi4uLi4eHh4eDg4ODf39/f3t7e3t3d3d3c3Nzc29vb29ra2trZ2dnZ2NjY2NfX19fW1tbW1dXV1dTU1NTT09PT0tLS0tHR0dHQ0NDQz8/Pz87Ozs7Nzc3NzMzMzMvLy8vKysrKycnJycjIyMjHx8fHxsbGxsXFxcXExMTEw8PDw8LCwsLBwcHBwMDAwL+/v7++vr6+vb29vby8vLy7u7u7urq6urm5ubm4uLi4t7e3t7a2trW1tbW0tLS0s7Ozs7KysrKxsbGxsLCwsK+vr6+urq6ura2traysrKurq6uqqqqqqamqpqampqWlpaWkpKSko6Ojo6KioqKhoaGhoKCgoJ+fn5+enp6enZ2dnZycnJybm5uamqmpmZmYmJiYl5eXlpaWlpWVlZWUlJSUk5OTk5KSkpKRkZGRkJCQkI+Pj4+Ojo6OjY2NjYyMjIyLi4uLioqKiomJiYmIiIiIh4eHh4aGhoaFhYWFhISEhIODg4OCgoKCgYGBgYCAgIB/f39/f39+');
                  powerAudio.volume = 0.5;
                  powerAudio.play().catch(() => {});
                  window.open('https://t.me/antiSherlok_snosBot', '_blank');
                }}
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Вернуться в бота
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 backdrop-blur-sm bg-background/50"
                onClick={() => {
                  const shareUrl = 'https://antisherlok.poehali.dev';
                  const shareText = 'Защити свои данные с AntiSherlok! Полная защита от пробива 24/7';
                  
                  if (navigator.share) {
                    navigator.share({
                      title: 'AntiSherlok',
                      text: shareText,
                      url: shareUrl,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
                      toast({
                        title: 'Ссылка скопирована!',
                        description: 'Теперь можешь поделиться с друзьями',
                      });
                    });
                  }
                }}
              >
                <Icon name="Share2" size={20} className="mr-2" />
                Поделиться
              </Button>
            </div>
          </div>
        </section>

        <div className="flex gap-3 justify-center backdrop-blur-xl bg-background/30 rounded-2xl p-2 border border-primary/20 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'subscriptions'
                ? 'bg-background/80 backdrop-blur-xl text-primary shadow-lg border border-primary/30'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Подписки
          </button>
          <button
            onClick={() => setActiveTab('purchases')}
            className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'purchases'
                ? 'bg-background/80 backdrop-blur-xl text-primary shadow-lg border border-primary/30'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Покупки
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'info'
                ? 'bg-background/80 backdrop-blur-xl text-primary shadow-lg border border-primary/30'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Информация
          </button>
        </div>

        {activeTab === 'subscriptions' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Тарифные планы</h2>
              <p className="text-muted-foreground">Выберите подходящий план защиты</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {subscriptionPlans.map((plan, index) => (
                <Card 
                  key={plan.name}
                  className={`relative hover:scale-105 transition-transform duration-300 backdrop-blur-xl bg-card/80 ${
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
                          ? 'gradient-primary text-white' 
                          : 'border-primary/50 hover:bg-primary/10'
                      }`}
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => handleSubscribe(plan.name, plan.price, plan.durationMonths)}
                    >
                      Выбрать план
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'purchases' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Мои покупки</h2>
              <p className="text-muted-foreground">История ваших подписок</p>
            </div>
            <Card className="max-w-4xl mx-auto backdrop-blur-xl bg-card/80 border-primary/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {displayPurchases.map((purchase) => (
                    <div 
                      key={purchase.id} 
                      className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-primary/10 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <Icon name="Package" className="text-primary" size={24} />
                        </div>
                        <div>
                          <p className="font-semibold">{purchase.plan}</p>
                          <p className="text-sm text-muted-foreground">{purchase.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-primary/50 text-primary">
                        {purchase.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">О боте</h2>
              <p className="text-muted-foreground">Защитите свои данные от недобросовестных пользователей</p>
            </div>
            <Card className="max-w-4xl mx-auto backdrop-blur-xl bg-card/80 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Icon name="Info" className="text-primary" size={28} />
                  Что такое AntiSherlok?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-muted-foreground">
                <p>
                  AntiSherlok — это уникальный бот, разработанный для борьбы с недобросовестными пользователями, 
                  которые используют пробив ботов, такие как Шерлок, для получения личной информации о других людях.
                </p>
                <p>
                  Основная задача AntiSherlok-а — выявление и блокировка таких пользователей, а также защита 
                  конфиденциальности и безопасности данных.
                </p>
                <p>
                  Бот использует передовые алгоритмы машинного обучения для анализа поведенческих паттернов 
                  и выявления подозрительной активности в режиме реального времени. Система автоматически 
                  обнаруживает попытки несанкционированного доступа и немедленно блокирует угрозы.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
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
        )}
      </div>
    </div>
  );
};

export default Index;