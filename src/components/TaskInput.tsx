import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Bell, RotateCcw, Calendar } from 'lucide-react';
import { addTask } from '../store/tasksSlice';
import DatePicker from './DatePicker';
import ReminderPicker from './ReminderPicker';

const TaskInput: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showReminderPicker, setShowReminderPicker] = useState(false);
  const [dueDate, setDueDate] = useState<string | undefined>();
  const [reminder, setReminder] = useState<string | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(addTask({
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      priority: 'medium',
      createdAt: new Date().toISOString(),
      dueDate,
      reminder,
    }));
    
    setTitle('');
    setDueDate(undefined);
    setReminder(undefined);
  };

  return (
    <div className="relative mb-6">
      <form onSubmit={handleSubmit} className="bg-[#1e2b23] rounded-lg">
        <div className="p-4">
          <h2 className="text-white mb-4">Add A Task</h2>
          <div className="flex items-center gap-3 mb-3">
            <button
              type="button"
              onClick={() => {
                setShowReminderPicker(!showReminderPicker);
                setShowDatePicker(false);
              }}
              className="p-1.5 rounded-md hover:bg-gray-700 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-400" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded-md hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5 text-gray-400" />
            </button>
            <button
              type="button"
              onClick={() => {
                setShowDatePicker(!showDatePicker);
                setShowReminderPicker(false);
              }}
              className="p-1.5 rounded-md hover:bg-gray-700 transition-colors"
            >
              <Calendar className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a task"
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
            >
              ADD TASK
            </button>
          </div>
        </div>
      </form>

      {showDatePicker && (
        <div className="absolute left-0 top-full mt-2 z-10">
          <DatePicker
            selectedDate={dueDate}
            onSelect={(date) => {
              setDueDate(date);
              setShowDatePicker(false);
            }}
            onClose={() => setShowDatePicker(false)}
          />
        </div>
      )}

      {showReminderPicker && (
        <div className="absolute left-0 top-full mt-2 z-10">
          <ReminderPicker
            selectedTime={reminder}
            onSelect={(time) => {
              setReminder(time);
              setShowReminderPicker(false);
            }}
            onClose={() => setShowReminderPicker(false)}
          />
        </div>
      )}
    </div>
  );
};

export default TaskInput