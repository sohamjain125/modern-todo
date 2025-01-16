import { configureStore } from '@reduxjs/toolkit';
    import { persistStore, persistReducer } from 'redux-persist';
    import storage from 'redux-persist/lib/storage';
    import authReducer from './authSlice';
    import tasksReducer from './tasksSlice';

    const persistConfig = {
      key: 'root',
      storage,
      whitelist: ['auth', 'tasks'],
    };

    const persistedReducer = persistReducer(persistConfig, (state, action) => {
      if (action.type === 'auth/logout') {
        storage.removeItem('persist:root');
        return undefined;
      }
      return {
        auth: authReducer(state?.auth, action),
        tasks: tasksReducer(state?.tasks, action),
      };
    });

    export const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    export const persistor = persistStore(store);

    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;
