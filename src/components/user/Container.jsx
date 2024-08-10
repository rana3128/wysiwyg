import { useNode } from "@craftjs/core";
import {
  Slider,
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Collapse,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const Container = ({ background, padding, title, children, ...props }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const {
    connectors: { connect, drag },
  } = useNode();

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "98%",
        gap: "10px",
        border: "1px solid #dad5d5",
        margin: "5px 0",
        padding: "10px",
        background: "transparent",
      }}
      ref={(ref) => connect(drag(ref))}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormLabel component="legend">{title}</FormLabel>
        <IconButton onClick={handleToggleCollapse}>
          {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      </Box>
      <Collapse in={!isCollapsed}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

export const ContainerSettings = () => {
  const {
    title,
    padding,
    actions: { setProp },
  } = useNode((node) => ({
    title: node.data.props.title,
    padding: node.data.props.padding,
  }));

  return (
    <>
      <FormControl fullWidth margin="normal" component="fieldset">
        <FormLabel component="legend">Title</FormLabel>
        <TextField
          value={title}
          onChange={(e) =>
            setProp((props) => (props.title = e.target.value), 500)
          }
          variant="outlined"
          fullWidth
        />
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
  title: "Container",
  background: "#ffffff",
  padding: 3,
};

Container.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
