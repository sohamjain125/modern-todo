import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import tasksReducer from './tasksSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'tasks']
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedTasksReducer = persistReducer(persistConfig, tasksReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    tasks: persistedTasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;