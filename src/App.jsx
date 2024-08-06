import { Editor, Frame, Element } from "@craftjs/core";
import { Typography, Paper, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

import { SettingsPanel } from "./components/SettingsPanel";
import { Toolbox } from "./components/Toolbox";
import { Topbar } from "./components/Topbar";
import { Button } from "./components/user/Button";
import { Card, CardBottom, CardTop } from "./components/user/Card";
import { Container } from "./components/user/Container";
import { Text } from "./components/user/Text";
import { Chart } from "./components/user/Chart";
import { RowContainer } from "./components/user/RowContainer"; // Import the new component

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    background: "rgb(252, 253, 253)",
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div style={{ margin: "0 auto", width: "100%" }}>
      <Editor
        resolver={{
          Card,
          Button,
          Text,
          Container,
          CardTop,
          CardBottom,
          Chart,
          RowContainer, // Register the new component
        }}
      >
        <Topbar />
        <Grid container spacing={2} style={{ paddingTop: "10px" }}>
          <Grid item xs={10}>
            <Frame>
              <Element
                canvas
                is={Container}
                padding={5}
                background="#eeeeee"
                data-cy="root-container"
              >
                <Text
                  fontSize={20}
                  text="Hi world! Add more components"
                  data-cy="frame-text"
                />
              </Element>
            </Frame>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.root}>
              <Toolbox />
              <SettingsPanel />
            </Paper>
          </Grid>
        </Grid>
      </Editor>
    </div>
  );
}
