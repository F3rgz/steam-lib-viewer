import { NextRequest, NextResponse } from "next/server";

// TODO: Load from config
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
}

export interface GetAccountResponse {
  games: Game[];
  game_count: number;
  most_played_game?: Game | null;
  total_playtime: number;
  // TODO: Return content ID - load image on UI?
}

// TODO: Find type for request context
export async function GET(req: NextRequest, context: any) {
  try {
    const response: Response = await fetch(
      `${STEAM_API_ADDR}/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_KEY}&steamid=${context.params.steamID}&include_appinfo=true`
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseJSON: GetOwnedGamesResponse = await response.json();

    let mostPlayedGame: Game | null = null;
    let totalGameTime: number = 0;
    responseJSON.response?.games?.forEach((game) => {
      if (
        !mostPlayedGame ||
        game.playtime_forever > mostPlayedGame.playtime_forever
      ) {
        mostPlayedGame = game;
      }

      totalGameTime += game.playtime_forever;
    });

    let result: GetAccountResponse = {
      games: responseJSON.response.games,
      game_count: responseJSON.response.game_count,
      most_played_game: mostPlayedGame,
      total_playtime: totalGameTime,
    };

    return NextResponse.json(result, {
      status: 200,
    });
  } catch (errorMessage) {
    return NextResponse.json(
      { error: `Failed to get account.  + ${errorMessage}` },
      {
        status: 500,
      }
    );
  }
}
