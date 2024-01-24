import { GetAccountResponse } from "@/app/api/account/[steamID]/interface";
import { SEARCH_ACTIONS } from "../actions/userSearchActions";

interface InitialState {
  results: GetAccountResponse | null;
  loading: boolean;
  error: boolean;
}

const initialState: InitialState = {
  results: null,
  loading: false,
  error: false,
};

const searchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SEARCH_ACTIONS.GET_PLAYER_SUMMARY:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case SEARCH_ACTIONS.GET_PLAYER_SUMMARY_COMPLETE:
      return {
        ...state,
        loading: false,
        results: action.payload,
        error: false,
      };
    case SEARCH_ACTIONS.GET_PLAYER_SUMMARY_FAILED:
      return {
        ...state,
        loading: false,
        results: null,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default searchReducer;
