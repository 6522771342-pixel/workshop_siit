import React from 'react';
import { Clock, Sun, Moon, Coffee, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useStore } from '../hooks/useStore';

export function Dashboard() {
  const { data, addMood, toggleTask } = useStore();
  const currentHour = new Date().getHours();
  
  let greeting = 'Good Morning';
  if (currentHour >= 12) greeting = 'Good Afternoon';
  if (currentHour >= 18) greeting = 'Good Evening';

  const todayStr = new Date().toISOString().split('T')[0];
  const todayMood = data.moods.find(m => m.date === todayStr)?.mood || '❓';
  const completedTasks = data.tasks.filter(t => t.completed).length;
  const totalTasks = data.tasks.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{greeting}, User!</h2>
          <p className="text-slate-500 mt-1">{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Focus Time" value="4h 30m" icon={<Clock className="text-blue-500" />} />
        <StatCard title="Mood Today" value={todayMood} icon={<Sun className="text-yellow-500" />} />
        <StatCard title="Tasks" value={`${completedTasks}/${totalTasks}`} icon={<CheckCircle className="text-green-500" />} />
        <StatCard title="Sleep" value="7h 15m" icon={<Moon className="text-indigo-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Today's Schedule</h3>
          <div className="space-y-4">
             {data.schedule.map(item => {
                // Simple logic to check if current time is within this item's window
                const now = new Date();
                const currentMinutes = now.getHours() * 60 + now.getMinutes();
                const [startH, startM] = item.startTime.split(':').map(Number);
                const startMinutes = startH * 60 + startM;
                const endMinutes = startMinutes + item.durationMinutes;
                
                const isActive = currentMinutes >= startMinutes && currentMinutes < endMinutes;

                return (
                 <ScheduleItem 
                    key={item.id}
                    time={item.startTime} 
                    title={item.title} 
                    type={item.type as any} 
                    duration={`${item.durationMinutes}m`}
                    isActive={isActive}
                 />
                );
             })}
             {data.schedule.length === 0 && <p className="text-slate-400 text-center py-4">No schedule set for today. Go to 'Schedule' tab to add one.</p>}
          </div>
        </div>

        {/* Quick Actions / Mood */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="text-lg font-bold text-slate-800 mb-4">How are you feeling?</h3>
             <div className="grid grid-cols-5 gap-2">
                {['😢', '😕', '😐', '🙂', '🤩'].map((emoji, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => addMood(emoji as any)}
                    className={`text-2xl p-3 rounded-xl transition-colors ${todayMood === emoji ? 'bg-indigo-100 ring-2 ring-indigo-500' : 'hover:bg-indigo-50'}`}
                  >
                    {emoji}
                  </button>
                ))}
             </div>
          </div>
          
           <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
             <div className="flex items-center gap-3 mb-2">
               <Coffee size={24} />
               <h3 className="font-bold text-lg">Break Reminder</h3>
             </div>
             <p className="opacity-90">Remember to take small breaks to stay productive and healthy.</p>
             <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
               Take a 5m Break
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
      <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  )
}

function ScheduleItem({ time, title, type, duration, isActive }: { time: string, title: string, type: 'work' | 'break' | 'meeting' | 'meal' | 'personal' | 'sleep', duration: string, isActive?: boolean }) {
  const colors = {
    work: 'bg-blue-100 text-blue-700 border-blue-200',
    break: 'bg-green-100 text-green-700 border-green-200',
    meeting: 'bg-purple-100 text-purple-700 border-purple-200',
    meal: 'bg-orange-100 text-orange-700 border-orange-200',
    personal: 'bg-pink-100 text-pink-700 border-pink-200',
    sleep: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  };

  return (
    <div className={`flex gap-4 items-start group ${isActive ? 'scale-[1.02] transition-transform' : ''}`}>
      <div className={`w-20 pt-1 text-sm font-medium text-right ${isActive ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>{time}</div>
      <div className={`flex-1 p-4 rounded-xl border ${colors[type]} ${isActive ? 'ring-2 ring-indigo-500 ring-offset-2' : ''} transition-all`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h4 className="font-bold">{title}</h4>
            {isActive && <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>}
          </div>
          <span className="text-xs font-bold opacity-70 px-2 py-1 rounded-full bg-white/50">{duration}</span>
        </div>
      </div>
    </div>
  )
}

function CheckSquare({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
}
