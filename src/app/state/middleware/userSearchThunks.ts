import { GetAccountResponse } from "@/app/api/account/[steamID]/route";
import { Dispatch } from "redux";
import {
  getPlayerSummaryComplete,
  getPlayerSummaryLoading,
} from "../actions/userSearchActions";

export const getPlayerSummaryThunk =
  (playerId: string) => async (dispatch: Dispatch) => {
    dispatch(getPlayerSummaryLoading());

    // TODO: Add error handling here.
    const response = await fetch(`/api/account/${playerId || "null"}`);
    const playerData = await response.json();

    dispatch(getPlayerSummaryComplete(playerData as GetAccountResponse));
  };
