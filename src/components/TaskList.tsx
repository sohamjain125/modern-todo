import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TaskItem from './TaskItem';

interface TaskListProps {
  viewMode: 'list' | 'grid';
}

const TaskList: React.FC<TaskListProps> = ({ viewMode }) => {
  const { tasks, filter, currentList, searchQuery } = useSelector((state: RootState) => state.tasks);
  const theme = useSelector((state: RootState) => state.auth.theme);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesList = task.listId === currentList;
    
    if (!matchesSearch || !matchesList) return false;

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
      <div className={`${
        viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
          : 'space-y-4'
      }`}>
        {incompleteTasks.map(task => (
          <TaskItem key={task.id} task={task} theme={theme} />
        ))}
      </div>

      {completedTasks.length > 0 && (
        <div>
          <h3 className={`text-sm font-medium mb-3 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Completed
          </h3>
          <div className={`${
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-4'
          }`}>
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} theme={theme} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
