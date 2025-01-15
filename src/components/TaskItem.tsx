import React from 'react';
import { useDispatch } from 'react-redux';
import { Star } from 'lucide-react';
import { Task } from '../types';
import { toggleTask, updateTaskPriority, deleteTask } from '../store/tasksSlice';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div className={`group p-4 rounded-lg transition-colors ${
      task.completed 
        ? 'bg-[rgba(32,32,32,0.6)]' 
        : 'bg-[rgba(32,32,32,0.8)] hover:bg-[rgba(38,38,38,0.9)]'
    }`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleTask(task.id))}
          className="mt-1 h-5 w-5 rounded border-gray-600 bg-transparent checked:bg-green-600 checked:border-green-600 focus:ring-0 focus:ring-offset-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <span className={`${
              task.completed ? 'line-through text-gray-400' : 'text-white'
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
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
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


export default TaskItem