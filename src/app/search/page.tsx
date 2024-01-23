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
          />
        </FormControl>
        <Button variant="contained" sx={{ marginTop: "1rem" }}>
          Search
        </Button>
      </Box>
    </Box>
  );
}
