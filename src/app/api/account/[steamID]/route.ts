import { NextRequest, NextResponse } from "next/server";

// TODO: Load from config
export const STEAM_KEY = "9F5EC369D46BF58C87B1830905695619";
export const STEAM_API_ADDR = "http://api.steampowered.com";

export interface AccountRouteParams {
  steamID: string;
}

export interface GetOwnedGamesResponse {
  response: { games: any[]; game_count: number };
}

// TODO: Find type for request context
export async function GET(req: NextRequest, context: any) {
  try {
    const response: Response = await fetch(
      `${STEAM_API_ADDR}/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_KEY}&steamid=${context.params.steamID}`
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseJSON: GetOwnedGamesResponse = await response.json();

    return NextResponse.json(
      {
        data: responseJSON.response,
      },
      {
        status: 200,
      }
    );
  } catch (errorMessage) {
    return NextResponse.json(
      { error: `Failed to get account.  + ${errorMessage}` },
      {
        status: 500,
      }
    );
  }
}
