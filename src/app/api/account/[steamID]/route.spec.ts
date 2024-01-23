import { enableFetchMocks } from "jest-fetch-mock";
import { NextRequest } from "next/server";
import { describe } from "node:test";
import { GET, STEAM_API_ADDR, STEAM_KEY } from "./route";
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
enableFetchMocks();

describe("Account Route", () => {
  describe("GET", () => {
    let fetchSpy: jest.SpyInstance;

    beforeEach(() => {
      fetchSpy = jest.spyOn(global, "fetch");
      jest.spyOn(global, "Response");
    });

    it("should call the steam API with the correct URL", async () => {
      fetchSpy.mockResolvedValue({
        okay: true,
        json: () => ({ response: { game_count: 10, games: [] } }),
      });
      const mockRequest = new NextRequest("http://test.com");

      await GET(mockRequest, { params: { steamID: "123" } });

      expect(fetchSpy).toHaveBeenCalledWith(
        `${STEAM_API_ADDR}/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_KEY}&steamid=${123}`
      );
    });
  });
});

// .mockImplementation(
//     Promise.resolve(
//       new Response({
//         okay: true,
//         response: { game_count: 10, games: [] },
//       })
//     )
//   )

// /{
//     json: () =>
//       Promise.resolve({
//         okay: true,
//         response: { game_count: 10, games: [] },
//       }),
//   }) as any
