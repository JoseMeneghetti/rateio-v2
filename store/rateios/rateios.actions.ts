import { createAction } from "@reduxjs/toolkit";
import { IExpenses, IParticipants, IResult } from "./rateios.reducer";

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

// export const fetchMonstersData = createAsyncThunk<Monster[]>(
//   "monsters/fetchMonstersData",
//   MonsterService.getAll
// );

// export const fetchBattleData = createAsyncThunk(
//   "monsters/fetchBattleData",
//   async ({
//     firstMonster,
//     secondMonster,
//   }: {
//     firstMonster: string;
//     secondMonster: string;
//   }) => {
//     const response = await MonsterService.getBattleWinner(
//       firstMonster,
//       secondMonster
//     );

//     console.log(response);

//     return response;
//   }
// );

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

export const setResult = createAction<IResult>("rateio/setResult");
// export const setComputerMonster = createAction<Monster | null>(
//   "monsters/setComputerMonster"
// );
