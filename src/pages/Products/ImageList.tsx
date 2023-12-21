import React from "react";
import { Card, CardMedia, Grid } from "@mui/material";
import { Image_Res } from "../../types/reponse.type";
interface Props {
  images: Image_Res[];
}
const ImageList = (props: Props) => {
  return (
    <Grid container spacing={2}>
      {props.images.map((image: any, index: number) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={image.imageUrl}
              alt={`Image ${index + 1}`}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageList;
