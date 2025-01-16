import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListTodo, Calendar, Star, ClipboardList, UserSquare2, LogOut, Plus } from 'lucide-react';
import { RootState } from '../store';
import { setFilter } from '../store/tasksSlice';
import { logout } from '../store/authSlice';
import { addList, setCurrentList } from '../store/tasksSlice';
import { TasksState } from '../types';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);
  const user = useSelector((state: RootState) => state.auth.user);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const lists = useSelector((state: RootState) => state.tasks.lists);
  const theme = useSelector((state: RootState) => state.auth.theme);
  
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [newListName, setNewListName] = useState('');

  const todayTasks = tasks.filter(task => 
    new Date(task.createdAt).toDateString() === new Date().toDateString()
  );

  const filters = [
    { id: 'all', label: 'All Tasks', icon: ListTodo },
    { id: 'today', label: 'Today', icon: Calendar },
    { id: 'important', label: 'Important', icon: Star },
    { id: 'planned', label: 'Planned', icon: ClipboardList },
    { id: 'assigned', label: 'Assigned to me', icon: UserSquare2 },
  ];

  const handleAddList = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListName.trim()) {
      const newList = {
        id: Date.now().toString(),
        name: newListName.trim(),
        color: '#' + Math.floor(Math.random()*16777215).toString(16),
      };
      dispatch(addList(newList));
      dispatch(setCurrentList(newList.id));
      setNewListName('');
      setShowNewListInput(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`w-64 min-h-screen p-4 flex flex-col ${
      theme === 'dark' ? 'bg-[#141414]' : 'bg-white'
    }`}>
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img 
            src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop'} 
            alt={user?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3">
          <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Hey, {user?.name}
          </p>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {filters.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => dispatch(setFilter(id as TasksState['filter']))}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              currentFilter === id 
                ? 'bg-[#1e2b23] text-green-500' 
                : theme === 'dark'
                  ? 'text-gray-300 hover:bg-[#1e2b23] hover:text-green-500'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-green-600'
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            {label}
          </button>
        ))}

        {lists.map(list => (
          <button
            key={list.id}
            onClick={() => dispatch(setCurrentList(list.id))}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'text-gray-300 hover:bg-[#1e2b23] hover:text-green-500'
                : 'text-gray-600 hover:bg-gray-100 hover:text-green-600'
            }`}
          >
            <div 
              className="w-3 h-3 rounded-full mr-3"
              style={{ backgroundColor: list.color }}
            />
            {list.name}
          </button>
        ))}
      </nav>

      {showNewListInput ? (
        <form onSubmit={handleAddList} className="mb-4">
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="List name"
            className={`w-full p-2 rounded-lg mb-2 ${
              theme === 'dark'
                ? 'bg-[#1e2b23] text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowNewListInput(false)}
              className={`flex-1 p-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowNewListInput(true)}
          className={`w-full flex items-center p-3 rounded-lg mb-4 transition-colors ${
            theme === 'dark'
              ? 'text-gray-300 hover:bg-[#1e2b23] hover:text-green-500'
              : 'text-gray-600 hover:bg-gray-100 hover:text-green-600'
          }`}
        >
          <Plus className="w-5 h-5 mr-3" />
          Add list
        </button>
      )}

      <div className={`rounded-lg p-4 ${
        theme === 'dark' ? 'bg-[#1e2b23]' : 'bg-gray-100'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>Today Tasks</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <span className="sr-only">Info</span>
            ℹ️
          </button>
        </div>
        <p className={`text-2xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>{todayTasks.length}</p>
        <div className={`w-full h-2 rounded-full overflow-hidden ${
          theme === 'dark' ? 'bg-[#141414]' : 'bg-gray-200'
        }`}>
          <div 
            className="h-full bg-green-500 rounded-full transition-all"
            style={{ 
              width: `${(todayTasks.filter(t => t.completed).length / Math.max(todayTasks.length, 1)) * 100}%` 
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Pending</span>
          <span>Done</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;