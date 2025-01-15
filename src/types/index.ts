export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  reminder?: string;
  createdAt: string;
  listId?: string;
}

export interface TaskList {
  id: string;
  name: string;
  color: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

export interface TasksState {
  tasks: Task[];
  lists: TaskList[];
  currentList: string;
  filter: 'all' | 'today' | 'important' | 'planned' | 'assigned';
  selectedTaskId: string | null;
}