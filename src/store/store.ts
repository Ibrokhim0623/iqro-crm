import { combineReducers, configureStore } from "@reduxjs/toolkit";
import studentsSlice from "./reducers/students-slice";

const rootReducer = combineReducers({
  studentsSlice,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
