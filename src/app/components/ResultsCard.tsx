import { Box, Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import palette from "../theme/palette";

export interface ResultsCardProps {
  /**
   * Style to be added to the base <Card /> component
   * */
  style?: React.CSSProperties;
  /**
   * The title to display in the card.
   */
  title: string;
  /**
   * Optional image to display in the <CardContent />.
   * */
  imageUrl?: string;
  /**
   * Subtitle string.
   */
  subtitle: string;
}

const ResultsCard: FC<ResultsCardProps> = (props) => {
  const { style, title, imageUrl, subtitle } = props;

  return (
    <Card
      variant="elevation"
      style={style}
      sx={{
        boxShadow: 3,
        backgroundColor: palette.dark,
      }}
    >
      <CardContent sx={{ color: palette.light, height: "100%" }}>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          textAlign={"center"}
        >
          {title}
        </Typography>
        <Box
          boxShadow={""}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80%",
            gap: "10px",
          }}
        >
          {!!imageUrl && (
            <img src={imageUrl} style={{ width: "40%", height: "40%" }} />
          )}
          <Typography
            variant="h5"
            sx={{ fontSize: imageUrl ? "0.8rem" : "5rem", marginTop: "1rem" }}
            textAlign="center"
            fontWeight="bold"
          >
            {subtitle}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
