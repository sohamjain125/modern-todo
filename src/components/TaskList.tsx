import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'today':
        return new Date(task.createdAt).toDateString() === new Date().toDateString();
      case 'important':
        return task.priority === 'high';
      case 'planned':
        return task.dueDate !== undefined;
      case 'assigned':
        return true;
      default:
        return true;
    }
  });

  const incompleteTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      <div className="task-grid">
        {incompleteTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>

      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-gray-400 text-sm font-medium mb-3">Completed</h3>
          <div className="task-grid">
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList