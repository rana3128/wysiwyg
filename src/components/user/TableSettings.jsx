import React, { useState, useEffect } from "react";
import { useNode } from "@craftjs/core";
import { TextField, Box, Button } from "@mui/material";

export const TableSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({ props: node.data.props }));

  const [dataSource, setDataSource] = useState(props.dataSource || "");
  const [title, setTitle] = useState(props.title || "Custom Table");

  const applyDataSource = () => {
    setProp((props) => {
      props.dataSource = dataSource;
    });
  };

  useEffect(() => {
    setProp((props) => {
      props.title = title;
    });
  }, [title]);

  return (
    <Box p={2}>
      <TextField
        label="Table Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Data Source"
        value={dataSource}
        onChange={(e) => setDataSource(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={applyDataSource}
        sx={{ marginTop: 1 }}
      >
        Apply
      </Button>
    </Box>
  );
};
