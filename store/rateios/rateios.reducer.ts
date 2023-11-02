import { createReducer } from "@reduxjs/toolkit";
import {
  setDeleteExpense,
  setEditExpense,
  setNewExpense,
  setRateioName,
  setRateioParticipants,
  setResult,
} from "./rateios.actions";

export interface IExpenses {
  expense_name: string;
  expense_value: number;
  icon: string;
}

export interface IParticipants {
  name: string;
  expenses: IExpenses[];
}

export interface IRateio {
  nameRateio: string;
  participants: IParticipants[];
  result: IResult;
}

export interface IResult {
  findHowManyPayWithoutDiferences: IFindHowManyPayWithoutDiferences[];
  listForResult: IListForResult[];
  onlyParticipants: INames[];
  sumOfPaids: INames[];
  total: INames[];
  suggestion: ISuggestionItem[];
}

export interface IFindHowManyPayWithoutDiferences {
  expense: string;
  value: number;
  icon: string;
  names: INames[];
}

interface IListForResult {
  participant: string;
  expenses: number;
}

export interface INames {
  name: string;
  value: number;
}

export interface ISuggestionItem {
  name: string;
  value: number;
  receives?: { receiveFrom: string; receiveValue: number }[];
  pays?: { pays: string; payValue: number }[];
}

const initialState: IRateio = {
  nameRateio: "",
  participants: [],
  result: {
    findHowManyPayWithoutDiferences: [],
    listForResult: [],
    onlyParticipants: [],
    sumOfPaids: [],
    total: [],
    suggestion: []
  },
};

export const rateioReducer = createReducer(initialState, (builder) => {
  //name rateio
  builder.addCase(setRateioName, (state, action) => ({
    ...state,
    nameRateio: action.payload,
  }));
  //participants
  builder.addCase(setRateioParticipants, (state, action) => {
    const { expenses, name } = action.payload;

    const existingParticipant = state.participants.find(
      (participant) => participant.name === name
    );

    if (existingParticipant) {
      return {
        ...state,
        participants: state.participants.map((participant) => {
          if (participant.name === action.payload.name) {
            if (
              participant?.expenses[0]?.expense_name ===
              expenses[0]?.expense_name
            ) {
              const newValue =
                expenses[0].expense_value +
                participant.expenses[0].expense_value;

              const oldExpenses = participant.expenses.filter(
                (expense) => expense.expense_name !== expenses[0]?.expense_name
              );

              return {
                ...participant,
                expenses: [
                  ...oldExpenses,
                  {
                    expense_name: expenses[0].expense_name,
                    expense_value: newValue,
                    icon: expenses[0].icon,
                  },
                ],
              };
            } else {
              return {
                ...participant,
                expenses: [...expenses],
              };
            }
          }
          return participant;
        }),
      };
    }

    return { ...state, participants: [...state.participants, action.payload] };
  });

  builder.addCase(setNewExpense, (state, action) => {
    const { name, expense } = action.payload;

    const updatedParticipants = state.participants.map((participant) => {
      if (participant.name === name) {
        if (participant?.expenses[0]?.expense_name === expense?.expense_name) {
          const newValue =
            expense.expense_value + participant.expenses[0]?.expense_value;

          const oldExpenses = participant.expenses.filter(
            (expenseItem) => expenseItem.expense_name !== expense?.expense_name
          );

          return {
            ...participant,
            expenses: [
              ...oldExpenses,
              {
                expense_name: expense.expense_name,
                expense_value: newValue,
                icon: expense.icon,
              },
            ],
          };
        } else {
          return {
            ...participant,
            expenses: [...participant.expenses, expense],
          };
        }
      }
      return participant;
    });

    return {
      ...state,
      participants: updatedParticipants,
    };
  });

  builder.addCase(setEditExpense, (state, action) => {
    const { name, expense, original_expense } = action.payload;

    const updatedParticipants = state.participants.map((participant) => {
      if (participant.name === name) {
        const filtered = participant.expenses.filter(
          (el) => original_expense !== el.expense_name
        );

        return { ...participant, expenses: [...filtered, expense] };
      }
      return participant;
    });

    return {
      ...state,
      participants: updatedParticipants,
    };
  });

  builder.addCase(setDeleteExpense, (state, action) => {
    const { name, original_expense } = action.payload;

    const updatedParticipants = state.participants.map((participant) => {
      if (participant.name === name) {
        const filtered = participant.expenses.filter(
          (el) => original_expense !== el.expense_name
        );

        return { ...participant, expenses: [...filtered] };
      }
      return participant;
    });

    return {
      ...state,
      participants: updatedParticipants,
    };
  });

  //expenses share
  builder.addCase(setResult, (state, action) => {
    return {
      ...state,
      result: action.payload,
    };
  });
});
