import Icon from '@/components/ui/icon';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

interface UserProfileProps {
  telegramUser: TelegramUser | null;
}

export const UserProfile = ({ telegramUser }: UserProfileProps) => {
  if (!telegramUser) return null;

  return (
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
  );
};
