import { createReducer } from "@reduxjs/toolkit";
import {
  fetchRateio,
  setDeleteExpense,
  setEditExpense,
  setNewExpense,
  setActiveRateio,
  setRateioName,
  setRateioParticipants,
  setResetActiveRateio,
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
  participants: IParticipants[];
  nameRateio: string;
  whoPaid: IwhoPaid[];
  listForResult: IListForResult[];
  onlyParticipants: INames[];
  sumOfPaids: INames[];
  total: INames[];
  suggestion: ISuggestionItem[];
}
export interface IFetchedRateio extends IRateio {
  id: string;
  whiteListPermission: boolean;
}
export interface IRateios {
  activeRateio: IRateio;
  fetchedRateio: IFetchedRateio;
}

export interface IwhoPaid {
  expense: string;
  value: number;
  icon: string;
  names: INames[];
}

export interface IListForResult {
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

const initialState: IRateios = {
  activeRateio: {
    participants: [],
    nameRateio: "",
    whoPaid: [],
    listForResult: [],
    onlyParticipants: [],
    sumOfPaids: [],
    total: [],
    suggestion: [],
  },
  fetchedRateio: {
    participants: [],
    nameRateio: "",
    whoPaid: [],
    listForResult: [],
    onlyParticipants: [],
    sumOfPaids: [],
    total: [],
    suggestion: [],
    id: "",
    whiteListPermission: false,
  },
};

export const rateioReducer = createReducer(initialState, (builder) => {
  //name rateio
  builder.addCase(setRateioName, (state, action) => ({
    ...state,
    activeRateio: {
      ...state.activeRateio,
      nameRateio: action.payload,
    },
  }));
  //participants
  builder.addCase(setRateioParticipants, (state, action) => {
    const { expenses, name } = action.payload;

    const existingParticipant = state.activeRateio.participants.find(
      (participant) => participant.name === name
    );

    if (existingParticipant) {
      return {
        ...state,
        activeRateio: {
          ...state.activeRateio,
          participants: state.activeRateio.participants.map((participant) => {
            if (participant.name === action.payload.name) {
              if (
                participant?.expenses[0]?.expense_name ===
                expenses[0]?.expense_name
              ) {
                const newValue =
                  expenses[0].expense_value +
                  participant.expenses[0].expense_value;

                const oldExpenses = participant.expenses.filter(
                  (expense) =>
                    expense.expense_name !== expenses[0]?.expense_name
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
        },
      };
    }

    return {
      ...state,
      activeRateio: {
        ...state.activeRateio,
        participants: [...state.activeRateio.participants, action.payload],
      },
    };
  });

  builder.addCase(setNewExpense, (state, action) => {
    const { name, expense } = action.payload;

    const updatedParticipants = state.activeRateio.participants.map(
      (participant) => {
        if (participant.name === name) {
          if (
            participant?.expenses[0]?.expense_name === expense?.expense_name
          ) {
            const newValue =
              expense.expense_value + participant.expenses[0]?.expense_value;

            const oldExpenses = participant.expenses.filter(
              (expenseItem) =>
                expenseItem.expense_name !== expense?.expense_name
            );

            return {
              ...state,
              activeRateio: {
                ...state.activeRateio,
                participants: {
                  ...state.activeRateio.participants,
                  expenses: [
                    ...oldExpenses,
                    {
                      expense_name: expense.expense_name,
                      expense_value: newValue,
                      icon: expense.icon,
                    },
                  ],
                },
              },
            };
          } else {
            return {
              ...state,
              activeRateio: {
                ...state.activeRateio,
                participants: {
                  ...state.activeRateio.participants,
                  expenses: [...participant.expenses, expense],
                },
              },
            };
          }
        }
        return participant;
      }
    );

    return {
      ...state,
      participants: updatedParticipants,
    };
  });

  builder.addCase(setEditExpense, (state, action) => {
    const { name, expense, original_expense } = action.payload;

    const updatedParticipants = state.activeRateio.participants.map(
      (participant) => {
        if (participant.name === name) {
          const filtered = participant.expenses.filter(
            (el) => original_expense !== el.expense_name
          );

          return { ...participant, expenses: [...filtered, expense] };
        }
        return participant;
      }
    );

    return {
      ...state,
      activeRateio: {
        ...state.activeRateio,
        participants: updatedParticipants,
      },
    };
  });

  builder.addCase(setDeleteExpense, (state, action) => {
    const { name, original_expense } = action.payload;

    const updatedParticipants = state.activeRateio.participants.map(
      (participant) => {
        if (participant.name === name) {
          const filtered = participant.expenses.filter(
            (el) => original_expense !== el.expense_name
          );

          return { ...participant, expenses: [...filtered] };
        }
        return participant;
      }
    );

    return {
      ...state,
      activeRateio: {
        ...state.activeRateio,
        participants: updatedParticipants,
      },
    };
  });

  //expenses share
  builder.addCase(setActiveRateio, (state, action) => ({
    ...state,
    activeRateio: action.payload,
  }));

  builder.addCase(setResetActiveRateio, (state, action) => ({
    ...state,
    activeRateio: {
      participants: [],
      nameRateio: "",
      whoPaid: [],
      listForResult: [],
      onlyParticipants: [],
      sumOfPaids: [],
      total: [],
      suggestion: [],
    },
  }));

  //fetch rateio
  builder.addCase(fetchRateio.pending, (state) => ({
    ...state,
    fetchedRateio: {
      participants: [],
      whiteListPermission: false,
      id: "",
      nameRateio: "",
      whoPaid: [],
      listForResult: [],
      onlyParticipants: [],
      sumOfPaids: [],
      total: [],
      suggestion: [],
    },
  }));

  builder.addCase(fetchRateio.rejected, (state) => ({
    ...state,
    fetchedRateio: {
      participants: [],
      whiteListPermission: false,
      id: "",
      nameRateio: "",
      whoPaid: [],
      listForResult: [],
      onlyParticipants: [],
      sumOfPaids: [],
      total: [],
      suggestion: [],
    },
  }));

  builder.addCase(fetchRateio.fulfilled, (state, action) => ({
    ...state,
    fetchedRateio: {
      id: action.payload.id,
      whiteListPermission: action.payload.whiteListPermission,
      nameRateio: action.payload.nameRateio,
      listForResult: JSON.parse(action.payload.listForResult),
      onlyParticipants: JSON.parse(action.payload.onlyParticipants),
      suggestion: JSON.parse(action.payload.suggestion),
      sumOfPaids: JSON.parse(action.payload.sumOfPaids),
      total: JSON.parse(action.payload.total),
      whoPaid: JSON.parse(action.payload.whoPaid),
      participants: JSON.parse(action.payload.participants),
    },
  }));
});
