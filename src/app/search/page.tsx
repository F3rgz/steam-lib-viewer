"use client";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  InputBaseProps,
  InputLabel,
  alpha,
  styled,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { GetAccountResponse } from "../api/account/[steamID]/route";
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

export default function About() {
  const dispatch = useAppDispatch();

  const loading: boolean = useAppSelector((state) => state.search.loading);
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

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "40em",
          height: "20em",
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
        <Button
          variant="contained"
          sx={{ marginTop: "1rem" }}
          onClick={searchPlayers}
          disabled={loading}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}
