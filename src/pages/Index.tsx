import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import func2url from '../../backend/func2url.json';
import { UserProfile } from '@/components/UserProfile';
import { LoadingScreen } from '@/components/LoadingScreen';
import { HeroSection } from '@/components/HeroSection';
import { TabNavigation } from '@/components/TabNavigation';
import { SubscriptionsTab } from '@/components/SubscriptionsTab';
import { PurchasesTab } from '@/components/PurchasesTab';
import { InfoTab } from '@/components/InfoTab';

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
    return <LoadingScreen loadingProgress={loadingProgress} />;
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
        'Уведомления в реальном времени'
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
        'VIP поддержка',
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
    { id: 1, plan: 'Нет активных подписок', date: '-', status: 'Нет данных', price: '', duration: 0, startDate: '', endDate: '' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <UserProfile telegramUser={telegramUser} />
        <HeroSection />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'subscriptions' && (
          <SubscriptionsTab 
            subscriptionPlans={subscriptionPlans}
            onSubscribe={handleSubscribe}
          />
        )}

        {activeTab === 'purchases' && (
          <PurchasesTab subscriptions={displayPurchases} />
        )}

        {activeTab === 'info' && (
          <InfoTab users={users} efficiency={efficiency} />
        )}
      </div>
    </div>
  );
};

export default Index;
