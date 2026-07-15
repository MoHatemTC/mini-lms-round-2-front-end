import { motion } from 'framer-motion';
import { 
  Trophy, Flame, Star, Zap, Crown, Target, 
  ChevronRight, Award, Shield, CheckCircle2
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';

/* ============================================================
   MOCK DATA
   ============================================================ */
const userStats = {
  level: 12,
  title: 'Scholar',
  xp: 12450,
  nextLevelXp: 15000,
  streak: 14,
  rank: 'Top 5%',
  totalBadges: 8
};

const badges = [
  { id: 1, name: 'First Steps', description: 'Completed first lesson', icon: '🏃', color: 'bg-blue-500', earned: true, date: 'Oct 1' },
  { id: 2, name: 'Bookworm', description: 'Read 10 articles', icon: '📚', color: 'bg-emerald-500', earned: true, date: 'Oct 5' },
  { id: 3, name: 'On Fire', description: '7 day learning streak', icon: '🔥', color: 'bg-orange-500', earned: true, date: 'Oct 12' },
  { id: 4, name: 'Sharpshooter', description: '100% on a quiz', icon: '🎯', color: 'bg-rose-500', earned: true, date: 'Oct 14' },
  { id: 5, name: 'Night Owl', description: 'Learned past midnight', icon: '🦉', color: 'bg-indigo-500', earned: false, progress: 0 },
  { id: 6, name: 'Mastermind', description: 'Complete 5 advanced courses', icon: '🧠', color: 'bg-purple-500', earned: false, progress: 40 },
  { id: 7, name: 'Social Butterfly', description: 'Post 10 discussion comments', icon: '🦋', color: 'bg-sky-500', earned: false, progress: 80 },
  { id: 8, name: 'Perfectionist', description: 'Earn 3 certificates', icon: '⭐', color: 'bg-amber-500', earned: false, progress: 66 },
];

const leaderboard = [
  { rank: 1, name: 'David Lee', xp: 24500, avatar: 'https://i.pravatar.cc/150?img=11', trend: 'up' },
  { rank: 2, name: 'Emma Wilson', xp: 22100, avatar: 'https://i.pravatar.cc/150?img=5', trend: 'same' },
  { rank: 3, name: 'Alex Student', xp: 12450, avatar: 'https://i.pravatar.cc/150?img=12', trend: 'up', isUser: true },
  { rank: 4, name: 'James Smith', xp: 11200, avatar: 'https://i.pravatar.cc/150?img=15', trend: 'down' },
  { rank: 5, name: 'Sophia Chen', xp: 9800, avatar: 'https://i.pravatar.cc/150?img=9', trend: 'down' },
];

export default function Achievements() {
  return (
    <div className="max-w-[1200px] mx-auto pb-12 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Achievements</h1>
          <p className="text-text-secondary mt-1">Track your progress, earn badges, and climb the leaderboard.</p>
        </div>
      </div>

      {/* Top Stats Banner */}
      <Card className="p-6 sm:p-10 border-border bg-card shadow-premium relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        {/* Level Ring */}
        <div className="relative shrink-0 flex items-center justify-center">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle cx="80" cy="80" r="74" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-muted" />
            <circle 
              cx="80" cy="80" r="74" fill="transparent" stroke="currentColor" strokeWidth="8" 
              strokeDasharray={465} strokeDashoffset={465 - (465 * (userStats.xp / userStats.nextLevelXp))}
              className="text-primary transition-all duration-1000 ease-out" 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-text-secondary">Level</span>
            <span className="text-5xl font-black text-foreground drop-shadow-sm">{userStats.level}</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Crown className="h-3 w-3" /> {userStats.title} Rank
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">You're doing great!</h2>
          <p className="text-text-secondary mb-6">You need {userStats.nextLevelXp - userStats.xp} XP to reach Level {userStats.level + 1}. Complete lessons and quizzes to earn more.</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-background border border-border rounded-xl">
              <Zap className="h-5 w-5 text-amber-500 fill-current" />
              <div>
                <p className="text-[10px] font-bold text-text-secondary uppercase">Total XP</p>
                <p className="font-bold leading-none">{userStats.xp.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-background border border-border rounded-xl">
              <Flame className="h-5 w-5 text-orange-500 fill-current" />
              <div>
                <p className="text-[10px] font-bold text-text-secondary uppercase">Day Streak</p>
                <p className="font-bold leading-none">{userStats.streak}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-background border border-border rounded-xl">
              <Target className="h-5 w-5 text-rose-500" />
              <div>
                <p className="text-[10px] font-bold text-text-secondary uppercase">Ranking</p>
                <p className="font-bold leading-none">{userStats.rank}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Badges Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground">Badges & Awards</h3>
            <span className="text-sm font-medium text-text-secondary">{badges.filter(b => b.earned).length} of {badges.length} Unlocked</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={cn(
                  "p-4 text-center h-full flex flex-col items-center border-border transition-all duration-300",
                  badge.earned ? "bg-card shadow-sm hover:shadow-premium hover:-translate-y-1" : "bg-muted/30 opacity-70 grayscale"
                )}>
                  <div className={cn(
                    "h-16 w-16 rounded-full flex items-center justify-center text-3xl mb-3 shadow-inner",
                    badge.earned ? badge.color : "bg-background border border-border"
                  )}>
                    {badge.icon}
                  </div>
                  <h4 className="font-bold text-sm text-foreground mb-1">{badge.name}</h4>
                  <p className="text-[10px] text-text-secondary mb-3 leading-tight flex-1">{badge.description}</p>
                  
                  {badge.earned ? (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-[10px] w-full justify-center">
                      Earned {badge.date}
                    </Badge>
                  ) : (
                    <div className="w-full mt-auto">
                      <div className="flex justify-between text-[10px] mb-1 font-medium">
                        <span>Progress</span>
                        <span>{badge.progress}%</span>
                      </div>
                      <ProgressBar progress={badge.progress || 0} className="h-1.5" indicatorClassName="bg-primary" />
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground">Global Leaderboard</h3>
            <button className="text-sm font-medium text-primary hover:text-primary/80">View All</button>
          </div>
          
          <Card className="p-2 border-border bg-card shadow-sm">
            {leaderboard.map((user, index) => (
              <div 
                key={user.rank}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-colors",
                  user.isUser ? "bg-primary/5 border border-primary/20 shadow-sm" : "hover:bg-muted/50 border border-transparent"
                )}
              >
                <div className="w-6 text-center font-bold text-text-secondary">
                  {user.rank === 1 ? <Crown className="h-5 w-5 text-amber-500 mx-auto" /> : 
                   user.rank === 2 ? <Crown className="h-5 w-5 text-slate-400 mx-auto" /> : 
                   user.rank === 3 ? <Crown className="h-5 w-5 text-amber-700 mx-auto" /> : 
                   user.rank}
                </div>
                <Avatar src={user.avatar} className={cn("h-10 w-10 border-2", user.isUser ? "border-primary" : "border-transparent")} />
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-bold truncate", user.isUser ? "text-primary" : "text-foreground")}>
                    {user.name} {user.isUser && "(You)"}
                  </p>
                  <p className="text-xs text-text-secondary">{user.xp.toLocaleString()} XP</p>
                </div>
              </div>
            ))}
          </Card>

          {/* Daily Challenge Mock */}
          <Card className="p-5 border-border bg-card shadow-sm relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Star className="h-16 w-16" />
            </div>
            <h4 className="font-bold text-sm text-primary uppercase tracking-wider mb-1">Daily Challenge</h4>
            <p className="font-bold text-foreground mb-2">Complete 2 lessons today</p>
            <div className="flex justify-between items-center text-sm font-medium mb-2">
              <span className="text-text-secondary">Progress: 1/2</span>
              <span className="text-amber-500 flex items-center gap-1"><Zap className="h-3 w-3 fill-current" /> +50 XP</span>
            </div>
            <ProgressBar progress={50} className="h-2" indicatorClassName="bg-amber-500" />
          </Card>
        </div>
      </div>
    </div>
  );
}
