// import { createSelector } from '@reduxjs/toolkit';
// import { RootState } from '../configureStore';

// export const selectAllTasks = createSelector(
//   (state: RootState) => state.ToDo.tasks,
//   (tasks) => {
//     const { byId, ids } = tasks;
//     return ids.map((id) => byId[id]);
//   }
// );

// export const selectCountOfCompletedTasks = createSelector(
//     (state: RootState) => state.ToDo.tasks,
//     (tasks) => {
//         const { byId, ids } = tasks;
//         return ids
//             .filter((id) => byId[id].completed === true)
//             .map((id) => byId[id]).length;
//     }
// );

// src/store/SelectorAndTests/selectors.ts
import { createSelector } from '@reduxjs/toolkit';

export const selectAllTasks = createSelector(
  (state: any) => state.ToDo.tasks,
  (tasks) => {
    const { byId, ids } = tasks;
    return ids.map((id: string) => byId[id]);
  }
);

export const selectCountOfCompletedTasks = createSelector(
  (state: any) => state.ToDo.tasks,
  (tasks) => {
    const { byId, ids } = tasks;
    return ids
      .filter((id: string) => byId[id].completed === true)
      .map((id: string) => byId[id]).length;
  }
);

// src/store/configureStore.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "../rootReducer";

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['General'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureAppStore = (preloadedState: any = {}) => {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
  });

  return store;
};

export type AppStore = ReturnType<typeof configureAppStore>;
export type StoreDispatch = AppStore["dispatch"];
export type StoreGetState = AppStore["getState"];

export const store = configureAppStore();
export const persistor = persistStore(store);

export default configureAppStore;
