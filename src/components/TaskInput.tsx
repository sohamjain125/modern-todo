import React, { useState } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { Bell, RotateCcw, Calendar } from 'lucide-react';
    import { addTask } from '../store/tasksSlice';
    import { RootState } from '../store';
    import DatePicker from './DatePicker';
    import ReminderPicker from './ReminderPicker';

    const TaskInput: React.FC = () => {
      const dispatch = useDispatch();
      const currentList = useSelector((state: RootState) => state.tasks.currentList);
      const theme = useSelector((state: RootState) => state.auth.theme);
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
          listId: currentList,
        }));
        
        setTitle('');
        setDueDate(undefined);
        setReminder(undefined);
      };

      return (
        <div className="relative mb-6">
          <form onSubmit={handleSubmit} className={theme === 'dark' ? 'bg-[#1e2b23]' : 'bg-white shadow-sm'}>
            <div className="p-4">
              <h2 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Add A Task</h2>
              <div className="flex items-center gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowReminderPicker(!showReminderPicker);
                    setShowDatePicker(false);
                  }}
                  className={`p-1.5 rounded-md transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Bell className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  type="button"
                  className={`p-1.5 rounded-md transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <RotateCcw className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowDatePicker(!showDatePicker);
                    setShowReminderPicker(false);
                  }}
                  className={`p-1.5 rounded-md transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }`}
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
                  className={`flex-1 bg-transparent placeholder-gray-400 outline-none ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
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

    export default TaskInput;
