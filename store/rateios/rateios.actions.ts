import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IExpenses, IParticipants, IRateio } from "./rateios.reducer";
import { checkRateio } from "@/service/rateio/rateio-service";

export interface IDeleteParticipantsPayload {
  name: string;
  original_expense: string;
}

export interface IEditParticipantsPayload extends IParticipantsPayload {
  original_expense: string;
}

export interface IParticipantsPayload {
  name: string;
  expense: IExpenses;
}

export const setRateioName = createAction<string>("rateio/setRateioName");

export const setRateioParticipants = createAction<IParticipants>(
  "rateio/setRateioParticipants"
);

export const setNewExpense = createAction<IParticipantsPayload>(
  "rateio/setNewExpense"
);

export const setEditExpense = createAction<IEditParticipantsPayload>(
  "rateio/setEditExpense"
);

export const setDeleteExpense = createAction<IDeleteParticipantsPayload>(
  "rateio/setDeleteExpense"
);

export const setActiveRateio = createAction<IRateio>("rateio/setResult");

export const setResetActiveRateio = createAction("rateio/setResetActiveRateio");

export const fetchRateio = createAsyncThunk(
  "rateio/fetchRateio",
  async ({ id, userID }: { id: string; userID?: string }) => {
    const data = await checkRateio(id, userID);

    return data;
  }
);

export const setClearActiveRateio = createAction("rateio/setClearActiveRateio");

export const setClearFetchRateio = createAction("rateio/setClearFetchRateio");

export const setClearEditRateio = createAction("rateio/setClearEditRateio");

export const setEditRateioName = createAction<string>("rateio/setEditRateioName");

export const setEditRateioParticipants = createAction<IParticipants>(
  "rateio/setEditRateioParticipants"
);

export const setEditNewExpense = createAction<IParticipantsPayload>(
  "rateio/setEditNewExpense"
);

export const setEditEditExpense = createAction<IEditParticipantsPayload>(
  "rateio/setEditEditExpense"
);

export const setEditDeleteExpense = createAction<IDeleteParticipantsPayload>(
  "rateio/setEditDeleteExpense"
);

export const setEditRateio = createAction<IRateio>("rateio/setEditRateio");