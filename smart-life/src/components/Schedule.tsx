import React, { useState } from 'react';
import { useStore, ScheduleItem } from '../hooks/useStore';
import { Plus, Trash2, Clock } from 'lucide-react';

export function Schedule() {
  const { data, addScheduleItem, deleteScheduleItem } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [duration, setDuration] = useState('60');
  const [type, setType] = useState<ScheduleItem['type']>('work');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startTime) return;
    
    addScheduleItem({
      title,
      startTime,
      durationMinutes: parseInt(duration),
      type
    });

    // Reset Form
    setTitle('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Daily Schedule</h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Add Activity</span>
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm animate-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Activity Title</label>
              <input 
                required
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., Morning Jog"
                className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Start Time</label>
              <input 
                required
                type="time" 
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Duration (minutes)</label>
              <select 
                value={duration} 
                onChange={e => setDuration(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="45">45 min</option>
                <option value="60">1 Hour</option>
                <option value="90">1.5 Hours</option>
                <option value="120">2 Hours</option>
                <option value="180">3 Hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
              <select 
                value={type} 
                onChange={e => setType(e.target.value as any)}
                className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="work">💼 Work / Study</option>
                <option value="meeting">👥 Meeting</option>
                <option value="break">☕ Break</option>
                <option value="meal">🍽️ Meal</option>
                <option value="personal">🏠 Personal</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button 
              type="button" 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
            >
              Save Schedule
            </button>
          </div>
        </form>
      )}

      {/* Timeline List */}
      <div className="space-y-4 relative pl-8 before:absolute before:left-3.5 before:top-4 before:h-full before:w-0.5 before:bg-slate-200">
        {data.schedule.length === 0 ? (
           <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
             <p className="text-slate-400">No schedule items yet. Add one to get started!</p>
           </div>
        ) : (
          data.schedule.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[30px] top-6 w-4 h-4 rounded-full bg-white border-4 border-indigo-500 z-10"></div>
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-lg font-bold text-indigo-600">{item.startTime}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wide">
                      {item.durationMinutes} min
                    </span>
                    <Badge type={item.type} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                </div>
                
                <button 
                  onClick={() => deleteScheduleItem(item.id)}
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete Item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Badge({ type }: { type: ScheduleItem['type'] }) {
  const styles = {
    work: 'bg-blue-100 text-blue-700',
    meeting: 'bg-purple-100 text-purple-700',
    break: 'bg-green-100 text-green-700',
    meal: 'bg-orange-100 text-orange-700',
    personal: 'bg-pink-100 text-pink-700',
    sleep: 'bg-indigo-100 text-indigo-700'
  };

  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${styles[type]}`}>
      {type}
    </span>
  );
}
