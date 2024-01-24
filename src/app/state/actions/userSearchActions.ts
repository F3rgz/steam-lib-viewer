import { GetAccountResponse } from "../../api/account/[steamID]/interface";

export enum SEARCH_ACTIONS {
  GET_PLAYER_SUMMARY = "SEARCH/GET_PLAYER_SUMMARY",
  GET_PLAYER_SUMMARY_COMPLETE = "SEARCH/GET_PLAYER_SUMMARY-COMPLETE",
  GET_PLAYER_SUMMARY_FAILED = "SEARCH/GET_PLAYER_SUMMARY-FAILED",
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

export const getPlayerSummaryFailed = () => {
  return {
    type: SEARCH_ACTIONS.GET_PLAYER_SUMMARY_FAILED,
  };
};
