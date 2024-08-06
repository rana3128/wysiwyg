import React from "react";
import { useNode, Element } from "@craftjs/core";
import { Box } from "@mui/material";
import { Chart } from "./Chart"; // Import the Chart component

export const RowContainer = () => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <Box
      ref={(ref) => connect(drag(ref))}
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "500px",
        justifyContent: "space-between",
        gap: "10px", // Add margin between the charts
      }}
    >
      <Element id="chart_1" canvas is={Chart} width="50%" />
      <Element id="chart_2" canvas is={Chart} width="50%" />
    </Box>
  );
};

RowContainer.craft = {
  displayName: "Row Container",
  rules: {
    canMoveIn: () => false, // Prevent other components from being added inside
  },
};
