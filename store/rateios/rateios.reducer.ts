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
  setClearActiveRateio,
  setClearFetchRateio,
  setEditRateioName,
  setEditRateioParticipants,
  setEditNewExpense,
  setEditEditExpense,
  setEditDeleteExpense,
  setClearEditRateio,
  setEditRateio,
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
  editRateio: IRateio;
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
  editRateio: {
    participants: [],
    nameRateio: "",
    whoPaid: [],
    listForResult: [],
    onlyParticipants: [],
    sumOfPaids: [],
    total: [],
    suggestion: [],
  },
};

export const rateioReducer = createReducer(initialState, (builder) => {
  //ACTIVE RATEIO
  builder.addCase(setRateioName, (state, action) => ({
    ...state,
    activeRateio: {
      ...state.activeRateio,
      nameRateio: action.payload,
    },
  }));

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
          const existingExpenseIndex = participant.expenses.findIndex(
            (expenseItem) => expenseItem.expense_name === expense.expense_name
          );

          if (existingExpenseIndex !== -1) {
            const updatedExpenses = participant.expenses.map(
              (expenseItem, index) => {
                if (index === existingExpenseIndex) {
                  return {
                    ...expenseItem,
                    expense_value:
                      expenseItem.expense_value + expense.expense_value,
                  };
                }
                return expenseItem;
              }
            );

            return {
              ...participant,
              expenses: updatedExpenses,
            };
          } else {
            return {
              ...participant,
              expenses: [...participant.expenses, expense],
            };
          }
        }
        return participant;
      }
    );

    const updatedActiveRateio = {
      ...state.activeRateio,
      participants: updatedParticipants,
    };

    return {
      ...state,
      activeRateio: updatedActiveRateio,
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

  builder.addCase(setClearActiveRateio, (state) => ({
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

  //EDIT RATEIO
  builder.addCase(setEditRateioName, (state, action) => ({
    ...state,
    editRateio: {
      ...state.editRateio,
      nameRateio: action.payload,
    },
  }));

  builder.addCase(setEditRateioParticipants, (state, action) => {
    const { expenses, name } = action.payload;

    const existingParticipant = state.editRateio.participants.find(
      (participant) => participant.name === name
    );

    if (existingParticipant) {
      return {
        ...state,
        editRateio: {
          ...state.editRateio,
          participants: state.editRateio.participants.map((participant) => {
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
      editRateio: {
        ...state.editRateio,
        participants: [...state.editRateio.participants, action.payload],
      },
    };
  });

  builder.addCase(setEditNewExpense, (state, action) => {
    const { name, expense } = action.payload;

    const updatedParticipants = state.editRateio.participants.map(
      (participant) => {
        if (participant.name === name) {
          const existingExpenseIndex = participant.expenses.findIndex(
            (expenseItem) => expenseItem.expense_name === expense.expense_name
          );

          if (existingExpenseIndex !== -1) {
            const updatedExpenses = participant.expenses.map(
              (expenseItem, index) => {
                if (index === existingExpenseIndex) {
                  return {
                    ...expenseItem,
                    expense_value:
                      expenseItem.expense_value + expense.expense_value,
                  };
                }
                return expenseItem;
              }
            );

            return {
              ...participant,
              expenses: updatedExpenses,
            };
          } else {
            return {
              ...participant,
              expenses: [...participant.expenses, expense],
            };
          }
        }
        return participant;
      }
    );

    const updatedActiveRateio = {
      ...state.editRateio,
      participants: updatedParticipants,
    };

    return {
      ...state,
      editRateio: updatedActiveRateio,
    };
  });

  builder.addCase(setEditEditExpense, (state, action) => {
    const { name, expense, original_expense } = action.payload;

    const updatedParticipants = state.editRateio.participants.map(
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
      editRateio: {
        ...state.editRateio,
        participants: updatedParticipants,
      },
    };
  });

  builder.addCase(setEditDeleteExpense, (state, action) => {
    const { name, original_expense } = action.payload;

    const updatedParticipants = state.editRateio.participants.map(
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
      editRateio: {
        ...state.editRateio,
        participants: updatedParticipants,
      },
    };
  });

  builder.addCase(setClearEditRateio, (state) => ({
    ...state,
    editRateio: {
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

  builder.addCase(setEditRateio, (state, action) => ({
    ...state,
    editRateio: action.payload,
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

  builder.addCase(setClearFetchRateio, (state) => ({
    ...state,
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
  }));
});
