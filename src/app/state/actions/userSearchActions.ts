import { GetAccountResponse } from "../../api/account/[steamID]/route";

export enum SEARCH_ACTIONS {
  GET_PLAYER_SUMMARY = "SEARCH/GET_PLAYER_SUMMARY",
  GET_PLAYER_SUMMARY_COMPLETE = "SEARCH/GET_PLAYER_SUMMARY-COMPLETE",
}

export const getPlayerSummaryLoading = () => {
  return {
    type: SEARCH_ACTIONS.GET_PLAYER_SUMMARY,
  };
};

export const getPlayerSummaryComplete = (data: GetAccountResponse) => {
  return {
    type: SEARCH_ACTIONS.GET_PLAYER_SUMMARY_COMPLETE,
    payload: data,
  };
};
