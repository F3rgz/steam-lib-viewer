import { NextRequest, NextResponse } from "next/server";
import {
  Game,
  GetAccountResponse,
  GetOwnedGamesResponse,
  STEAM_API_ADDR,
  STEAM_KEY,
} from "./interface";

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
