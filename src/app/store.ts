import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import playlistReducer from "features/playlist/playlistSlice";

export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
