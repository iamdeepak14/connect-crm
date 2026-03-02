import React, { useState } from 'react';
import { meetings } from '../data/dummyData';
import { Task } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { PlusIcon } from './icons/PlusIcon';

interface ScheduleProps {
    onAction: (type: string) => void;
    tasks: Task[];
}

const CalendarEvent: React.FC<{ title: string, color: string, isCompleted?: boolean }> = ({ title, color, isCompleted }) => (
    <div className={`text-[8px] sm:text-[10px] p-1 rounded-md mb-0.5 truncate border font-bold leading-none shadow-sm ${color} ${isCompleted ? 'opacity-40 grayscale' : ''}`}>
        {title}
    </div>
);

const Schedule: React.FC<ScheduleProps> = ({ onAction, tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const handleDayClick = (day: number) => {
    const newSelected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDay(newSelected);
  };

  const selectedDayTasks = tasks.filter(t => t.dueDate.toDateString() === selectedDay.toDateString());
  const selectedDayMeetings = meetings.filter(m => m.startTime.toDateString() === selectedDay.toDateString());

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="border border-border/40 bg-muted/5 min-h-[80px] sm:min-h-[100px]"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const isToday = dayDate.toDateString() === new Date().toDateString();
    const isSelected = dayDate.toDateString() === selectedDay.toDateString();
    
    const dayTasks = tasks.filter(t => t.dueDate.toDateString() === dayDate.toDateString());
    const dayMeetings = meetings.filter(m => m.startTime.toDateString() === dayDate.toDateString());

    days.push(
      <div 
        key={i} 
        onClick={() => handleDayClick(i)}
        className={`border border-border/40 p-1.5 min-h-[80px] sm:min-h-[100px] cursor-pointer transition-all relative group overflow-hidden ${
            isSelected ? 'bg-primary/5 ring-2 ring-primary/20 z-10' : 'bg-card hover:bg-muted/50'
        }`}
      >
        <div className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg font-black text-[10px] sm:text-xs mb-1.5 transition-all ${
            isToday ? 'bg-primary text-white shadow-lg' : isSelected ? 'bg-primary/20 text-primary' : 'text-foreground/60 group-hover:text-foreground'
        }`}>
            {i}
        </div>
        <div className="space-y-0.5 max-h-[60px] overflow-hidden">
            {dayMeetings.map(m => <CalendarEvent key={m.id} title={m.title} color="bg-blue-100 text-blue-700 border-blue-200" />)}
            {dayTasks.map(t => (
                <CalendarEvent 
                    key={t.id} 
                    title={t.title} 
                    isCompleted={t.isCompleted}
                    color={t.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'} 
                />
            ))}
        </div>
        {isSelected && (
             <button 
                onClick={(e) => { e.stopPropagation(); onAction('ADD_TASK'); }}
                className="absolute bottom-1 right-1 p-1 bg-primary text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
             >
                <PlusIcon className="w-3 h-3" />
             </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">Schedule</h1>
          <p className="text-muted-foreground mt-1 font-medium">Coordinate your enterprise timeline and task execution.</p>
        </div>
        <button 
            onClick={() => onAction('ADD_TASK')}
            className="w-full sm:w-auto bg-primary text-primary-foreground font-black px-6 py-3.5 rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center active:scale-95 uppercase tracking-widest text-xs"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Quick Task
        </button>
      </div>

      <div className="flex flex-col xl:grid xl:grid-cols-4 gap-8">
          {/* Calendar Grid */}
          <div className="xl:col-span-3 bg-card rounded-[2.5rem] border border-border shadow-sm overflow-hidden flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-border bg-muted/10">
                <h2 className="text-xl font-black text-foreground tracking-tight uppercase">
                  {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="p-2 rounded-xl text-muted-foreground hover:bg-white hover:shadow-sm border border-transparent hover:border-border transition-all"><ChevronLeftIcon className="w-5 h-5" /></button>
                  <button onClick={() => setCurrentDate(new Date())} className="text-[10px] font-black text-primary px-4 py-2 hover:bg-primary/5 rounded-lg transition-all uppercase tracking-widest">Today</button>
                  <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="p-2 rounded-xl text-muted-foreground hover:bg-white hover:shadow-sm border border-transparent hover:border-border transition-all"><ChevronRightIcon className="w-5 h-5" /></button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 text-center font-black text-muted-foreground text-[9px] uppercase tracking-[0.2em] py-4 border-b border-border bg-muted/5">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
              </div>
              <div className="grid grid-cols-7 flex-grow">
                {days}
              </div>
          </div>

          {/* Day Agenda */}
          <div className="bg-card rounded-[2.5rem] border border-border p-8 shadow-sm h-fit space-y-8 animate-in slide-in-from-right-10 duration-700">
              <div>
                  <h3 className="text-2xl font-black text-foreground tracking-tight">Day Agenda</h3>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">
                      {selectedDay.toLocaleDateString('default', { weekday: 'long', day: 'numeric', month: 'short' })}
                  </p>
              </div>

              <div className="space-y-6">
                  {selectedDayMeetings.length > 0 && (
                      <div className="space-y-3">
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-lg w-fit">Meetings</p>
                          {selectedDayMeetings.map(m => (
                              <div key={m.id} className="p-4 bg-muted/30 rounded-2xl border border-border/50 group hover:border-blue-200 transition-all">
                                  <p className="text-sm font-black text-foreground">{m.title}</p>
                                  <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase">
                                      {m.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {m.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                              </div>
                          ))}
                      </div>
                  )}

                  <div className="space-y-3">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-lg w-fit">Tasks</p>
                      {selectedDayTasks.length > 0 ? selectedDayTasks.map(t => (
                          <div key={t.id} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-2xl border border-border/50 group hover:border-primary/20 transition-all">
                              <div className={`w-2 h-2 rounded-full shrink-0 ${t.priority === 'High' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                              <div className="flex-1">
                                  <p className={`text-sm font-black text-foreground ${t.isCompleted ? 'line-through opacity-50' : ''}`}>{t.title}</p>
                                  <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">{t.priority} Priority</p>
                              </div>
                              {t.isCompleted && (
                                  <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                              )}
                          </div>
                      )) : (
                          <div className="py-12 text-center border-2 border-dashed border-border rounded-[2rem] px-6">
                              <p className="text-xs text-muted-foreground font-bold italic">No tasks scheduled for this day.</p>
                              <button 
                                onClick={() => onAction('ADD_TASK')}
                                className="mt-4 text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                              >
                                + Add Task
                              </button>
                          </div>
                      )}
                  </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                  <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 p-6 rounded-[2rem] border border-primary/10">
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Efficiency Tip</p>
                      <p className="text-xs text-foreground/80 font-medium leading-relaxed italic">"Break larger tasks into 25-minute sprints to maximize deep work sessions today."</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Schedule;