import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { IModals, modalReducer } from "./modal/modal.reducer";
import { IRateios, rateioReducer } from "./rateios/rateios.reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

interface CombinedState {
  modal: IModals;
  rateio: IRateios;
  // Adicione outros tipos de estado conforme necessário
}

const rootReducer = combineReducers<CombinedState>({
  modal: modalReducer,
  rateio: rateioReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["rateio"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const persistor = persistStore(store);
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
