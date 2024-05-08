import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  img: string;
  title: string;
  description: string;
};

function NewsCard({ img, title, description }: Props) {
  return (
    <>
      <Card
        sx={{
          maxWidth: 300,
          backgroundColor: "var(--text-color)",
          color: "var(--bg-color)",
          height: "fit-content",
        }}
      >
        <CardActionArea>
          <CardMedia component="img" height={140} image={img} alt="test" />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="truncate"
            >
              {title}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default NewsCard;
