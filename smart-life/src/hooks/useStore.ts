import { useState, useEffect } from 'react';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  category: 'work' | 'personal' | 'health';
};

export type MoodEntry = {
  date: string; // ISO date string YYYY-MM-DD
  mood: '😢' | '😕' | '😐' | '🙂' | '🤩';
  note?: string;
};

export type ScheduleItem = {
  id: string;
  title: string;
  startTime: string; // HH:mm
  durationMinutes: number;
  type: 'work' | 'break' | 'meeting' | 'meal' | 'sleep';
};

export type AppData = {
  tasks: Task[];
  moods: MoodEntry[];
  schedule: ScheduleItem[];
};

const INITIAL_DATA: AppData = {
  tasks: [
    { id: '1', title: 'Setup SmartLife App', completed: false, category: 'work' },
    { id: '2', title: 'Drink Water', completed: false, category: 'health' },
  ],
  moods: [],
  schedule: [
    { id: '1', title: 'Morning Routine', startTime: '07:00', durationMinutes: 60, type: 'personal' },
    { id: '2', title: 'Deep Work', startTime: '09:00', durationMinutes: 120, type: 'work' },
    { id: '3', title: 'Lunch', startTime: '12:00', durationMinutes: 60, type: 'meal' },
  ]
};

export function useStore() {
  const [data, setData] = useState<AppData>(() => {
    const saved = localStorage.getItem('smartlife-data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  useEffect(() => {
    localStorage.setItem('smartlife-data', JSON.stringify(data));
  }, [data]);

  const addTask = (title: string, category: Task['category']) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      category
    };
    setData(prev => ({ ...prev, tasks: [...prev.tasks, newTask] }));
  };

  const toggleTask = (id: string) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    }));
  };

  const addMood = (mood: MoodEntry['mood']) => {
    const today = new Date().toISOString().split('T')[0];
    setData(prev => {
        // Remove existing mood for today if any, then add new one
        const others = prev.moods.filter(m => m.date !== today);
        return { ...prev, moods: [...others, { date: today, mood }] };
    });
  };

  const addScheduleItem = (item: Omit<ScheduleItem, 'id'>) => {
    const newItem: ScheduleItem = { ...item, id: crypto.randomUUID() };
    setData(prev => ({
      ...prev,
      schedule: [...prev.schedule, newItem].sort((a, b) => a.startTime.localeCompare(b.startTime))
    }));
  };

  const deleteScheduleItem = (id: string) => {
    setData(prev => ({
      ...prev,
      schedule: prev.schedule.filter(i => i.id !== id)
    }));
  };

  return {
    data,
    addTask,
    toggleTask,
    addMood,
    addScheduleItem,
    deleteScheduleItem
  };
}
