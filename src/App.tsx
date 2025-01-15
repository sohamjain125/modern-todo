import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu, Search, Grid2X2, Sun } from 'lucide-react';
import { RootState } from './store';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="flex min-h-screen bg-[#1a1a1a]">
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'}`}>
        <Sidebar isOpen={sidebarOpen} />
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-[#141414] p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-700"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <img src="/vite.svg" alt="Logo" className="w-6 h-6" />
              <span className="text-green-500 font-semibold">DoIt</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-[#1e1e1e] text-white pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <button className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-700">
              <Grid2X2 className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-700">
              <Sun className="w-5 h-5" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <TaskInput />
            <TaskList />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;