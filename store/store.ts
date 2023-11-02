import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modal/modal.reducer";
import { rateioReducer } from "./rateios/rateios.reducer";
// ...

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    rateio: rateioReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
