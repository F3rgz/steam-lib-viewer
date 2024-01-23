import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import palette from "../theme/palette";

export interface HeaderProps {
  /**
   * The main page title
   */
  title: string;
}

export default function Header(props: HeaderProps) {
  const { title } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: palette.dark }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
