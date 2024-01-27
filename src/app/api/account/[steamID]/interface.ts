export const STEAM_KEY = "9F5EC369D46BF58C87B1830905695619";
export const STEAM_API_ADDR = "http://api.steampowered.com";

export interface AccountRouteParams {
  steamID: string;
}

export interface GetOwnedGamesResponse {
  response: { games: Game[]; game_count: number };
}

export interface Game {
  appid: number;
  playtime_forever: number;
  name: string;
  img_icon_url: string;
}

export interface GetAccountResponse {
  games: Game[];
  game_count: number;
  most_played_game?: Game | null;
  total_playtime: number;
  // TODO: Return content ID - load image on UI?
}
