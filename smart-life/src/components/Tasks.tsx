import React, { useState } from 'react';
import { useStore, Task } from '../hooks/useStore';
import { Plus, Check, Circle, Trash2 } from 'lucide-react';

export function Tasks() {
  const { data, addTask, toggleTask } = useStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [category, setCategory] = useState<Task['category']>('work');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask(newTaskTitle, category);
    setNewTaskTitle('');
  };

  const activeTasks = data.tasks.filter(t => !t.completed);
  const completedTasks = data.tasks.filter(t => t.completed);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Tasks</h2>
        <span className="text-slate-500 font-medium">{activeTasks.length} active, {completedTasks.length} completed</span>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAdd} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex gap-3">
        <input 
          type="text" 
          placeholder="Add a new task..." 
          className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value as any)}
          className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 text-slate-600 outline-none"
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="health">Health</option>
        </select>
        <button 
          type="submit"
          disabled={!newTaskTitle.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <Plus size={20} />
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-4">
        {activeTasks.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">To Do</h3>
            {activeTasks.map(task => (
              <TaskItem key={task.id} task={task} onToggle={() => toggleTask(task.id)} />
            ))}
          </div>
        )}

        {completedTasks.length > 0 && (
           <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1 mt-6">Completed</h3>
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} onToggle={() => toggleTask(task.id)} />
            ))}
          </div>
        )}

        {data.tasks.length === 0 && (
            <div className="text-center py-12 text-slate-400">
                <p>No tasks yet. Add one above!</p>
            </div>
        )}
      </div>
    </div>
  );
}

function TaskItem({ task, onToggle }: { task: Task, onToggle: () => void }) {
  const categoryColors = {
    work: 'bg-blue-100 text-blue-700',
    personal: 'bg-purple-100 text-purple-700',
    health: 'bg-green-100 text-green-700',
  };

  return (
    <div 
        onClick={onToggle}
        className={`group flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm cursor-pointer transition-all hover:border-indigo-300 ${task.completed ? 'opacity-60 bg-slate-50' : ''}`}
    >
      <div className={`text-slate-400 transition-colors ${task.completed ? 'text-green-500' : 'group-hover:text-indigo-500'}`}>
        {task.completed ? <CheckCircle size={24} className="fill-green-100" /> : <Circle size={24} />}
      </div>
      
      <div className="flex-1">
        <p className={`font-medium text-slate-800 ${task.completed ? 'line-through text-slate-500' : ''}`}>
            {task.title}
        </p>
      </div>

      <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[task.category]}`}>
        {task.category}
      </span>
    </div>
  );
}

function CheckCircle({ className, size }: { className?: string, size?: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}
