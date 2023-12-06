import { RootState } from "../store";

export const selectRateio = (state: RootState) => state.rateio;

export const selectActiveRateio = (state: RootState) =>
  state.rateio.activeRateio;
export const selectFetechedRateio = (state: RootState) =>
  state.rateio.fetchedRateio;

//participants
export const sselectFetchedParticipants = (state: RootState) =>
  state.rateio.fetchedRateio.participants;
export const selectActiveParticipants = (state: RootState) =>
  state.rateio.activeRateio.participants;

//Name rateio
export const selectFetchedNomeRateio = (state: RootState) =>
  state.rateio.fetchedRateio.nameRateio;
export const selectActiveNomeRateio = (state: RootState) =>
  state.rateio.activeRateio.nameRateio;

//ID
export const selectRateioId = (state: RootState) =>
  state.rateio.fetchedRateio.id;

//WhiteListEnabled
export const selectWhiteListPermission = (state: RootState) =>
  state.rateio.fetchedRateio.whiteListPermission;

//result
export const selectWhoPaid = (state: RootState) =>
  state.rateio.activeRateio.whoPaid;
export const selectListForResult = (state: RootState) =>
  state.rateio.activeRateio.listForResult;
export const selectOnlyParticipants = (state: RootState) =>
  state.rateio.activeRateio.onlyParticipants;
export const selectSuggestion = (state: RootState) =>
  state.rateio.activeRateio.suggestion;
export const selectTotal = (state: RootState) =>
  state.rateio.activeRateio.total;
export const selectSumOfPaids = (state: RootState) =>
  state.rateio.activeRateio.sumOfPaids;
