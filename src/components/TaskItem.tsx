import React from 'react';
import { useDispatch } from 'react-redux';
import { Star } from 'lucide-react';
import { Task } from '../types';
import { toggleTask, updateTaskPriority, deleteTask } from '../store/tasksSlice';

interface TaskItemProps {
  task: Task;
  theme: 'light' | 'dark';
}

const TaskItem: React.FC<TaskItemProps> = ({ task, theme }) => {
  const dispatch = useDispatch();

  return (
    <div className={`group p-4 rounded-lg transition-colors ${
      theme === 'dark'
        ? task.completed 
          ? 'bg-[rgba(32,32,32,0.6)]' 
          : 'bg-[rgba(32,32,32,0.8)] hover:bg-[rgba(38,38,38,0.9)]'
        : task.completed
          ? 'bg-gray-100'
          : 'bg-white hover:bg-gray-50 shadow-sm'
    }`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleTask(task.id))}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <span className={`${
              task.completed 
                ? 'line-through text-gray-400' 
                : theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {task.title}
            </span>
            <button
              onClick={() => dispatch(updateTaskPriority({
                id: task.id,
                priority: task.priority === 'high' ? 'medium' : 'high'
              }))}
              className={`flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md ${
                task.priority === 'high'
                  ? 'text-yellow-400 bg-yellow-400/10'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Star className="w-5 h-5" />
            </button>
          </div>
          {(task.dueDate || task.reminder) && (
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
              {task.dueDate && (
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              )}
              {task.reminder && (
                <span>Reminder: {new Date(task.reminder).toLocaleTimeString()}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;