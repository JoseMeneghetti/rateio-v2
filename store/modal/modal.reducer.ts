import { createReducer } from "@reduxjs/toolkit";
import {
  setModalAddExpenseClose,
  setModalAddExpenseOpen,
  setModalCreateClose,
  setModalCreateOpen,
  setModalDeleteClose,
  setModalDeleteOpen,
  setModalEditClose,
  setModalEditOpen,
  setModalGenerateOpen,
  setModalGenerateClose,
  setModalSaveRateioOpen,
  setModalSaveRateioClose,
  setModalAuthRateioOpen,
  setModalAuthRateioClose,
} from "./modal.actions";
import { IParticipantsPayload } from "../rateios/rateios.actions";

export interface IModals {
  modalCreate: IModal;
  modalAddExpense: IModalExpense;
  modalEdit: IModalEdit;
  modalDelete: IModalDelete;
  modalGenerate: IModalGenerate;
  modalSaveRateio: IModalSaveRateio;
  modalAuthRateio: IModalAuthRateio;
}

export interface IModalExpense {
  isOpen: boolean;
  name: string;
}

export interface IModalEdit {
  isOpen: boolean;
  participant: IParticipantsPayload | null;
}

export interface IModalDelete {
  isOpen: boolean;
  participant: IParticipantsPayload | null;
}

export interface IModalGenerate {
  isOpen: boolean;
}

export interface IModalSaveRateio {
  isOpen: boolean;
  rateioName: string;
}

export interface IModalAuthRateio {
  isOpen: boolean;
  rateioId: string;
}
export interface IModal {
  isOpen: boolean;
}

const initialState: IModals = {
  modalCreate: { isOpen: false },
  modalAddExpense: { isOpen: false, name: "" },
  modalEdit: { isOpen: false, participant: null },
  modalDelete: { isOpen: false, participant: null },
  modalGenerate: { isOpen: false },
  modalSaveRateio: { isOpen: false, rateioName: "" },
  modalAuthRateio: { isOpen: false, rateioId: "" },
};

export const modalReducer = createReducer(initialState, (builder) => {
  //Create
  builder.addCase(setModalCreateOpen, (state) => {
    state.modalCreate.isOpen = true;
  });

  builder.addCase(setModalCreateClose, (state) => {
    state.modalCreate.isOpen = false;
  });

  //Add Expense
  builder.addCase(setModalAddExpenseOpen, (state, action) => ({
    ...state,
    modalAddExpense: { isOpen: true, name: action.payload },
  }));

  builder.addCase(setModalAddExpenseClose, (state) => ({
    ...state,
    modalAddExpense: { isOpen: false, name: "" },
  }));

  //Edit
  builder.addCase(setModalEditOpen, (state, action) => ({
    ...state,
    modalEdit: { isOpen: true, participant: action.payload },
  }));

  builder.addCase(setModalEditClose, (state) => ({
    ...state,
    modalEdit: { isOpen: false, participant: null },
  }));

  //Edit
  builder.addCase(setModalDeleteOpen, (state, action) => ({
    ...state,
    modalDelete: { isOpen: true, participant: action.payload },
  }));

  builder.addCase(setModalDeleteClose, (state) => ({
    ...state,
    modalDelete: { isOpen: false, participant: null },
  }));

  //Generate
  builder.addCase(setModalGenerateOpen, (state, action) => ({
    ...state,
    modalGenerate: { isOpen: true },
  }));

  builder.addCase(setModalGenerateClose, (state) => ({
    ...state,
    modalGenerate: { isOpen: false },
  }));

  //Save Rateio
  builder.addCase(setModalSaveRateioOpen, (state, action) => ({
    ...state,
    modalSaveRateio: { isOpen: true, rateioName: action.payload },
  }));

  builder.addCase(setModalSaveRateioClose, (state) => ({
    ...state,
    modalSaveRateio: { isOpen: false, rateioName: "" },
  }));

  //Auth Rateio
  builder.addCase(setModalAuthRateioOpen, (state, action) => ({
    ...state,
    modalAuthRateio: { isOpen: true, rateioId: action.payload },
  }));

  builder.addCase(setModalAuthRateioClose, (state) => ({
    ...state,
    modalAuthRateio: { isOpen: false, rateioId: "" },
  }));
});
