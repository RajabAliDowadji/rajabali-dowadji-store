import { Box } from "@mui/material";
import React from "react";
import { Black_logo } from "./assets";
import "./ImageGrid.web.css";

const ImageGrid = (props: any) => {
  return (
    <Box className="ImageGrid_mainBox">
      <img
        src={props.ImageSrc}
        alt="rider_image"
        className="ImageGrid_riderImage"
      />
      <img
        src={Black_logo}
        alt="black_logo_image"
        className="ImageGrid_blackLogoImage"
      />
    </Box>
  );
};
export default ImageGrid;
