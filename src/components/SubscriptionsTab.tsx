import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface SubscriptionPlan {
  name: string;
  price: string;
  duration: string;
  durationMonths: number;
  features: string[];
  popular: boolean;
}

interface SubscriptionsTabProps {
  subscriptionPlans: SubscriptionPlan[];
  onSubscribe: (planName: string, price: string, durationMonths: number) => void;
}

export const SubscriptionsTab = ({ subscriptionPlans, onSubscribe }: SubscriptionsTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {subscriptionPlans.map((plan) => (
        <Card 
          key={plan.name}
          className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm ${
            plan.popular
              ? 'border-2 border-primary shadow-xl shadow-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5'
              : 'border border-primary/20 bg-background/80'
          }`}
        >
          {plan.popular && (
            <div className="absolute top-0 right-0">
              <Badge className="rounded-none rounded-bl-lg bg-gradient-to-r from-primary to-secondary border-0 text-white px-4 py-1">
                <Icon name="Star" size={16} className="mr-1" />
                Популярное
              </Badge>
            </div>
          )}
          <CardHeader className={plan.popular ? 'pt-12' : ''}>
            <CardTitle className="text-2xl gradient-text">{plan.name}</CardTitle>
            <CardDescription className="text-3xl font-bold text-foreground mt-2">
              {plan.price}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Icon name="Check" className="text-primary mt-0.5 flex-shrink-0" size={18} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className={`w-full ${
                plan.popular 
                  ? 'gradient-primary text-white hover:opacity-90 animate-glow' 
                  : 'bg-primary/10 hover:bg-primary/20 text-primary'
              }`}
              size="lg"
              onClick={() => onSubscribe(plan.name, plan.price, plan.durationMonths)}
            >
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              Оформить подписку
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
