import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export const HeroSection = () => {
  const { toast } = useToast();

  return (
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
  );
};
