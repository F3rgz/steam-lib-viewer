import { GetAccountResponse } from "@/app/api/account/[steamID]/route";
import { Dispatch } from "redux";
import {
  getPlayerSummaryComplete,
  getPlayerSummaryFailed,
  getPlayerSummaryLoading,
} from "../actions/userSearchActions";

export const getPlayerSummaryThunk =
  (playerId: string) => async (dispatch: Dispatch) => {
    dispatch(getPlayerSummaryLoading());

    try {
      const response = await fetch(`/api/account/${playerId || "null"}`);

      if (!response.ok) {
        throw new Error("Failed to find player by given ID.");
      }

      const playerData = await response.json();

      dispatch(getPlayerSummaryComplete(playerData as GetAccountResponse));
    } catch (error) {
      dispatch(getPlayerSummaryFailed());
    }
  };
