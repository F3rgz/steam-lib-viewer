import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GetAccountResponse } from "../api/account/[steamID]/route";
import { useAppSelector } from "../state/hooks";

export default function ResultsTable() {
  const results: GetAccountResponse = useAppSelector(
    (state) => state.search.results
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row">
                Number of Games
              </TableCell>
              <TableCell component="th" scope="row">
                Total Playtime (hrs)
              </TableCell>
              <TableCell component="th" scope="row">
                Most Played Game
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={"results"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {results?.game_count ?? "N/A"}
              </TableCell>
              <TableCell component="th" scope="row">
                {results?.total_playtime
                  ? `${results?.total_playtime}hrs`
                  : "N/A"}
              </TableCell>
              <TableCell component="th" scope="row">
                {results?.most_played_game?.name ?? "N/A"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
