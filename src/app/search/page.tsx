"use client";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  InputBaseProps,
  InputLabel,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { ChangeEvent, useState } from "react";
import { GetAccountResponse } from "../api/account/[steamID]/interface";
import ResultsCard from "../components/ResultsCard";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { getPlayerSummaryThunk } from "../state/middleware/userSearchThunks";
import palette from "../theme/palette";

const StyledInput = styled(InputBase)<InputBaseProps>(() => ({
  "label + &": {
    marginTop: "1rem",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: palette.background,
    border: "1px solid",
    borderColor: palette.light,
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    color: palette.light,
    // transition: theme.transitions.create([
    //   'border-color',
    //   'background-color',
    //   'box-shadow',
    // ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(palette.accent, 0.125)} 0 0 0 0.2rem`,
      borderColor: palette.light,
    },
  },
}));

enum StatsCategories {
  MOST_PLAYED,
  TOTAL_PLAYTIME,
  NUMBER_OF_GAMES,
}

export default function About() {
  const dispatch = useAppDispatch();

  const loading: boolean = useAppSelector((state) => state.search.loading);
  const error: boolean = useAppSelector((state) => state.search.error);
  const searchResults: GetAccountResponse = useAppSelector(
    (state) => state.search.results
  );

  const [inputText, setInputText] = useState<string>("");

  const onSearchFieldInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputText(event.target.value);
  };

  const searchPlayers = () => {
    dispatch(getPlayerSummaryThunk(inputText));
  };

  const getCardTitle = (category: StatsCategories): string => {
    switch (category) {
      case StatsCategories.MOST_PLAYED:
        // Use i18n etc
        return "Most Played Game";
      case StatsCategories.NUMBER_OF_GAMES:
        return "Number of Games";
      case StatsCategories.TOTAL_PLAYTIME:
        return "Total Playtime";
      default:
        return "";
    }
  };

  const getSteamContentUrl = (
    contentId: string | undefined
  ): string | undefined => {
    if (!contentId) return undefined;
    return `https://avatars.cloudflare.steamstatic.com/${contentId}_full.jpg`;
  };

  const getSubtitle = (category: StatsCategories): string => {
    switch (category) {
      case StatsCategories.MOST_PLAYED:
        // Use i18n etc
        return searchResults?.most_played_game?.name ?? "N/A";
      case StatsCategories.NUMBER_OF_GAMES:
        return searchResults?.games?.length?.toString() ?? "N/A";
      case StatsCategories.TOTAL_PLAYTIME:
        return searchResults?.total_playtime?.toString() ?? "N/A";
      default:
        return "";
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "70%",
          height: "15em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl variant="standard">
          <InputLabel
            shrink
            htmlFor="bootstrap-input"
            sx={{ color: palette.light }}
          >
            Steam ID
          </InputLabel>
          <StyledInput
            id="outlined-basic"
            sx={{
              width: "20em",
            }}
            onChange={onSearchFieldInput}
          />
        </FormControl>
        {!!error && (
          <Typography sx={{ color: red[400] }}>
            Could not find a player with given ID.
          </Typography>
        )}
        <Button
          variant="contained"
          sx={{ marginTop: "1rem" }}
          onClick={searchPlayers}
          disabled={loading}
        >
          Search
        </Button>
      </Box>
      {!!searchResults && (
        <Box
          sx={{
            width: "60%",
            height: "20em",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            gap: "4em",
            paddingBottom: "1rem",
          }}
        >
          {/* {!!searchResults && <ResultsTable />} */}

          <ResultsCard
            title={getCardTitle(StatsCategories.NUMBER_OF_GAMES)}
            subtitle={getSubtitle(StatsCategories.NUMBER_OF_GAMES)}
            style={{ flex: "1 1 0px", height: "20rem" }}
          ></ResultsCard>
          <ResultsCard
            title={getCardTitle(StatsCategories.MOST_PLAYED)}
            subtitle={getSubtitle(StatsCategories.MOST_PLAYED)}
            style={{
              flex: "1 1 0px",
              marginTop: "1rem",
              height: "20rem",
              scale: 1.2,
            }}
            imageUrl={getSteamContentUrl(
              searchResults?.most_played_game?.img_icon_url
            )}
          ></ResultsCard>
          <ResultsCard
            title={getCardTitle(StatsCategories.TOTAL_PLAYTIME)}
            subtitle={getSubtitle(StatsCategories.TOTAL_PLAYTIME)}
            style={{ flex: "1 1 0px", height: "20rem" }}
          ></ResultsCard>
        </Box>
      )}
    </Box>
  );
}
