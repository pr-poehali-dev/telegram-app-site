import Icon from '@/components/ui/icon';

interface LoadingScreenProps {
  loadingProgress: number;
}

export const LoadingScreen = ({ loadingProgress }: LoadingScreenProps) => {
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
};
