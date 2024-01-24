import { GetAccountResponse } from "@/app/api/account/[steamID]/route";
import { SEARCH_ACTIONS } from "../actions/userSearchActions";

interface InitialState {
  results: GetAccountResponse | null;
  loading: boolean;
}

const initialState: InitialState = {
  results: null,
  loading: false,
};

const searchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SEARCH_ACTIONS.GET_PLAYER_SUMMARY:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_ACTIONS.GET_PLAYER_SUMMARY_COMPLETE:
      return {
        ...state,
        loading: false,
        results: action.payload,
      };
    default:
      return { ...state };
  }
};

export default searchReducer;
