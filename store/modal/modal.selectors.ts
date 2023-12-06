import { RootState } from "../store";

export const selectModal = (state: RootState) => state.modal;

//Modals
export const selectModalAddExpense = (state: RootState) => state.modal.modalAddExpense;
export const selectModalCreate = (state: RootState) => state.modal.modalCreate;
export const selectModalDelete = (state: RootState) => state.modal.modalDelete;
export const selectModalEdit = (state: RootState) => state.modal.modalEdit;
export const selectModalGenerate = (state: RootState) => state.modal.modalGenerate;
export const selectModalSaveRateio = (state: RootState) => state.modal.modalSaveRateio;
export const selectModalAuthRateio = (state: RootState) => state.modal.modalAuthRateio;
