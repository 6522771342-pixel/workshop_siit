import React from 'react';
import { LayoutDashboard, CheckSquare, Calendar, Smile } from 'lucide-react';
import { View } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
}

export function Layout({ children, currentView, onNavigate }: LayoutProps) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 fixed h-full hidden md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            SmartLife
          </h1>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={currentView === 'dashboard'} 
            onClick={() => onNavigate('dashboard')}
          />
          <NavItem 
            icon={<Calendar size={20} />} 
            label="Schedule" 
            active={currentView === 'schedule'} 
            onClick={() => onNavigate('schedule')}
          />
          <NavItem 
            icon={<CheckSquare size={20} />} 
            label="Tasks" 
            active={currentView === 'tasks'} 
            onClick={() => onNavigate('tasks')}
          />
          <NavItem 
            icon={<Smile size={20} />} 
            label="Mood Tracker" 
            active={currentView === 'mood'} 
            onClick={() => onNavigate('mood')}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
      active 
        ? 'bg-indigo-50 text-indigo-600 font-medium' 
        : 'text-slate-600 hover:bg-slate-50'
    }`}>
      {icon}
      <span>{label}</span>
    </button>
  );
}
