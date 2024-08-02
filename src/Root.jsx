import { Editor, Frame, Element } from '@craftjs/core';
import { Typography, Paper, Grid, makeStyles } from '@material-ui/core';
import React from 'react';

import { SettingsPanel } from './components/SettingsPanel';
import { Toolbox } from './components/Toolbox';
import { Topbar } from './components/Topbar';
import { Button } from './components/user/Button';
import { Card, CardBottom, CardTop } from './components/user/Card';
import { Container } from './components/user/Container';
import { Text } from './components/user/Text';
import { Chart } from './components/user/Chart';

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    background: 'rgb(252, 253, 253)',
  },
}));
export default function Root() {
  const classes = useStyles();

  return (
    <div style={{ margin: '0 auto', width: '800px' }}>
      <Typography style={{ margin: '20px 0' }} variant="h5" align="center">
        Basic Page Editor
      </Typography>
      <Editor
        resolver={{
          Card,
          Button,
          Text,
          Container,
          CardTop,
          CardBottom,
          Chart,
        }}
      >
        <Topbar />
        <Grid container spacing={5} style={{ paddingTop: '10px' }}>
          <Grid item xs>
            <Frame>
              <Element
                canvas
                is={Container}
                padding={5}
                background="#eeeeee"
                data-cy="root-container"
              >

                <Text fontSize={20} text="Hi world! Add more components" data-cy="frame-text" />

              </Element>
            </Frame>
          </Grid>
          <Grid item xs={4}>
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