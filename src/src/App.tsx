import React, { useState, useEffect } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { Search, Grid2X2, Sun, Moon, Menu } from 'lucide-react';
    import { RootState } from './store';
    import { toggleTheme } from './store/authSlice';
    import { setViewMode, setSearchQuery } from './store/tasksSlice';
    import Auth from './components/Auth';
    import Sidebar from './components/Sidebar';
    import TaskInput from './components/TaskInput';
    import TaskList from './components/TaskList';

    function App() {
      const dispatch = useDispatch();
      const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
      const theme = useSelector((state: RootState) => state.auth.theme);
      const viewMode = useSelector((state: RootState) => state.tasks.viewMode);
      const [sidebarOpen, setSidebarOpen] = useState(true);
      const [searchValue, setSearchValue] = useState('');

      useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }, [theme]);

      const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        dispatch(setSearchQuery(value));
      };

      const toggleViewMode = () => {
        dispatch(setViewMode(viewMode === 'list' ? 'grid' : 'list'));
      };

      if (!isAuthenticated) {
        return <Auth />;
      }

      return (
        <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
          <div className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'}`}>
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          </div>
          <div className="flex-1 flex flex-col">
            <header className={`${theme === 'dark' ? 'bg-[#141414]' : 'bg-white'} p-4 flex items-center justify-between shadow-sm`}>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
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
                    value={searchValue}
                    onChange={handleSearch}
                    placeholder="Search tasks..."
                    className={`${
                      theme === 'dark' ? 'bg-[#1e1e1e] text-white' : 'bg-gray-100 text-gray-900'
                    } pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-1 focus:ring-green-500`}
                  />
                </div>
                <button
                  onClick={toggleViewMode}
                  className={`text-gray-400 hover:text-gray-600 dark:hover:text-white p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    viewMode === 'grid' ? 'bg-gray-200 dark:bg-gray-700' : ''
                  }`}
                >
                  <Grid2X2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </header>
            <main className={`flex-1 p-6 overflow-hidden ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-50'}`}>
              <div className="max-w-4xl mx-auto">
                <TaskInput />
                <TaskList viewMode={viewMode} />
              </div>
            </main>
          </div>
        </div>
      );
    }

    export default App
