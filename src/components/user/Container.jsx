import { useNode } from "@craftjs/core";
import {
  Slider,
  Box,
  FormControl,
  FormLabel,
} from "@mui/material";
import React, { useState } from "react";

export const Container = ({ background, padding, children, ...props }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "98%",
        gap: "10px", // Add margin between the charts
      }}
      ref={(ref) => connect(drag(ref))}
      style={{
        margin: "5px 0",
        background: "transparent",
        padding: `10px`,
        border: "1px solid #dad5d5",
      }}
    >
      {children}
    </Box>
  );
};

export const ContainerSettings = () => {
  const {
    background,
    padding,
    actions: { setProp },
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
  }));

  return (
    <>
      <FormControl fullWidth margin="normal" component="fieldset">
        <FormLabel component="legend">Background</FormLabel>
      </FormControl>
      <FormControl fullWidth margin="normal" component="fieldset">
        <FormLabel component="legend">Padding</FormLabel>
        <Slider
          defaultValue={padding}
          onChange={(_, value) =>
            setProp((props) => (props.padding = value), 500)
          }
        />
      </FormControl>
    </>
  );
};

export const ContainerDefaultProps = {
  background: "#ffffff",
  padding: 3,
};

Container.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
