import { RootState } from "../store";

export const selectRateio = (state: RootState) => state.rateio;

//participants
export const selectParticipants = (state: RootState) =>
  state.rateio.participants;

//Name rateio
export const selectNomeRateio = (state: RootState) => state.rateio.nameRateio;

//result
export const selectFindHowManyPayWithoutDiferences = (state: RootState) =>
  state.rateio.result.findHowManyPayWithoutDiferences;
export const selectListForResult = (state: RootState) =>
  state.rateio.result.listForResult;
export const selectOnlyParticipants = (state: RootState) =>
  state.rateio.result.onlyParticipants;
export const selectSuggestion = (state: RootState) =>
  state.rateio.result.suggestion;
export const selectTotal = (state: RootState) => state.rateio.result.total;
export const selectSumOfPaids = (state: RootState) =>
  state.rateio.result.sumOfPaids;
