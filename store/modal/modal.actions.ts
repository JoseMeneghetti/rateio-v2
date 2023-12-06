import { createAction } from "@reduxjs/toolkit";
import { IParticipantsPayload } from "../rateios/rateios.actions";

//Create
export const setModalCreateOpen = createAction("modal/setModalCreateOpen");

export const setModalCreateClose = createAction("modal/setModalCreateClose");

//Add Expense
export const setModalAddExpenseOpen = createAction<string>(
  "modal/setModalAddExpenseOpen"
);

export const setModalAddExpenseClose = createAction(
  "modal/setModalAddExpenseClose"
);

//Edit
export const setModalEditOpen = createAction<IParticipantsPayload>(
  "modal/setModalEditOpen"
);
export const setModalEditClose = createAction("modal/setModalEditClose");

//Delete
export const setModalDeleteOpen = createAction<IParticipantsPayload>(
  "modal/setModalDeleteOpen"
);
export const setModalDeleteClose = createAction("modal/setModalDeleteClose");

//Generate
export const setModalGenerateOpen = createAction("modal/setModalGenerateOpen");
export const setModalGenerateClose = createAction(
  "modal/setModalGenerateClose"
);

//Save Rateio
export const setModalSaveRateioOpen = createAction<string>("modal/setModalSaveRateioOpen");
export const setModalSaveRateioClose = createAction(
  "modal/setModalSaveRateioClose"
);

//Auth Rateio
export const setModalAuthRateioOpen = createAction<string>("modal/setModalAuthRateioOpen");
export const setModalAuthRateioClose = createAction(
  "modal/setModalAuthRateioClose"
);