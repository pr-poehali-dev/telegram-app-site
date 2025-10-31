import Icon from '@/components/ui/icon';

type TabType = 'subscriptions' | 'purchases' | 'info';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="flex gap-3 justify-center backdrop-blur-xl bg-background/30 rounded-2xl p-2 border border-primary/20 max-w-md mx-auto">
      <button
        onClick={() => onTabChange('subscriptions')}
        className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
          activeTab === 'subscriptions'
            ? 'bg-gradient-to-r from-primary/30 to-secondary/30 text-primary shadow-lg'
            : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <Icon name="ShoppingCart" size={20} />
          <span>Подписки</span>
        </div>
      </button>
      <button
        onClick={() => onTabChange('purchases')}
        className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
          activeTab === 'purchases'
            ? 'bg-gradient-to-r from-primary/30 to-secondary/30 text-primary shadow-lg'
            : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <Icon name="FileText" size={20} />
          <span>Покупки</span>
        </div>
      </button>
      <button
        onClick={() => onTabChange('info')}
        className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
          activeTab === 'info'
            ? 'bg-gradient-to-r from-primary/30 to-secondary/30 text-primary shadow-lg'
            : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <Icon name="Info" size={20} />
          <span>О сервисе</span>
        </div>
      </button>
    </div>
  );
};
