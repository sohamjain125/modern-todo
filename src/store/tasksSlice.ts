import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState, TaskList } from '../types';

const initialState: TasksState = {
  tasks: [],
  lists: [
    { id: 'default', name: 'Default List', color: '#22c55e' }
  ],
  currentList: 'default',
  filter: 'all',
  selectedTaskId: null,
  viewMode: 'list', // 'list' or 'grid'
  searchQuery: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    updateTaskPriority: (state, action: PayloadAction<{ id: string; priority: Task['priority'] }>) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.priority = action.payload.priority;
      }
    },
    setDueDate: (state, action: PayloadAction<{ id: string; dueDate: string }>) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.dueDate = action.payload.dueDate;
      }
    },
    setReminder: (state, action: PayloadAction<{ id: string; reminder: string }>) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.reminder = action.payload.reminder;
      }
    },
    setFilter: (state, action: PayloadAction<TasksState['filter']>) => {
      state.filter = action.payload;
    },
    setSelectedTask: (state, action: PayloadAction<string | null>) => {
      state.selectedTaskId = action.payload;
    },
    addList: (state, action: PayloadAction<TaskList>) => {
      state.lists.push(action.payload);
    },
    setCurrentList: (state, action: PayloadAction<string>) => {
      state.currentList = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'list' | 'grid'>) => {
      state.viewMode = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  updateTaskPriority,
  setDueDate,
  setReminder,
  setFilter,
  setSelectedTask,
  addList,
  setCurrentList,
  setViewMode,
  setSearchQuery,
} = tasksSlice.actions;

export default tasksSlice.reducer;
