import { useNode } from '@craftjs/core';
import { Slider, Paper, FormControl, FormLabel } from '@mui/material';
import React from 'react';

export const MainContainer = ({ background, padding, children, ...props }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <Paper
      {...props}
      ref={(ref) => connect(drag(ref))}
      style={{ margin: '5px 0', background, padding: `${padding}px`, minHeight: '500px' }}
    >
      {children}
    </Paper>
  );
};

export const MainContainerSettings = () => {
  const {
    background,
    padding,
    actions: { setProp },
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
  }));

  return (
    <div>
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
    </div>
  );
};

export const MainContainerDefaultProps = {
  background: '#ffffff',
  padding: 3,
};

MainContainer.craft = {
  props: MainContainerDefaultProps,
  related: {
    settings: MainContainerSettings,
  },
};
