// import { configureStore } from "@reduxjs/toolkit"; // No need for DeepPartial import from redux

// import rootReducer from "./rootReducer";

// // Import DeepPartial from TypeScript
// // TypeScript provides the DeepPartial type out of the box
// type DeepPartial<T> = T extends object
//   ? { [K in keyof T]?: DeepPartial<T[K]> }
//   : T;

// // Define the types for RootState and PartialRootState
// export type RootState = ReturnType<typeof rootReducer>;
// export type PartialRootState = DeepPartial<RootState>;

// // Configure the app store with proper types
// const configureAppStore = (preloadedState: PartialRootState = {}) => {
//   const store = configureStore({
//     reducer: rootReducer,
//     preloadedState, // Directly use preloadedState without needing any casting
//   });

//   return store;
// };

// // Export types for use in your app
// export type AppStore = ReturnType<typeof configureAppStore>;
// export type StoreDispatch = AppStore["dispatch"];
// export type StoreGetState = AppStore["getState"];

// export default configureAppStore;

// configureStore.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import rootReducer from "./rootReducer";

// Import DeepPartial from TypeScript
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

// Define the types for RootState and PartialRootState
export type RootState = ReturnType<typeof rootReducer>;
export type PartialRootState = DeepPartial<RootState>;

// Configure persist
const persistConfig = {
  key: 'root',
  storage,
  // Optionally blacklist certain reducers
  blacklist: ['General'], // General state won't be persisted
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the app store with proper types
const configureAppStore = (preloadedState: PartialRootState = {}) => {
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

// Export types for use in your app
export type AppStore = ReturnType<typeof configureAppStore>;
export type StoreDispatch = AppStore["dispatch"];
export type StoreGetState = AppStore["getState"];

export const store = configureAppStore();
export const persistor = persistStore(store);

export default configureAppStore;