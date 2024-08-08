import React, { useState, useEffect } from 'react';
import { useNode, Element } from '@craftjs/core';
import { Box, TextField } from '@mui/material';
import { ResizableContainer } from './ResizableContainer'; // Import the ResizableContainer component
import { Chart } from './Chart'; // Import the Chart component

export const RowContainer = ({ numberOfCharts }) => {
  const { connectors: { connect, drag } } = useNode();
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    setCharts(new Array(numberOfCharts).fill(0));
  }, [numberOfCharts]);

  return (
    <Box
      ref={ref => connect(drag(ref))}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        gap: '10px', // Add margin between the charts
      }}
    >
      {charts.map((_, index) => (
        <ResizableContainer key={index}>
          <Element id={`chart_${index + 1}`} is={Chart} canvas />
        </ResizableContainer>
      ))}
    </Box>
  );
};

const RowContainerSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }));
  const [numberOfCharts, setNumberOfCharts] = useState(props.numberOfCharts || 2);

  useEffect(() => {
    setProp((props) => {
      props.numberOfCharts = numberOfCharts;
    });
  }, [numberOfCharts]);

  return (
    <Box className='row-container-setting-panel' p={2}>
      <TextField
        label='Number of Charts'
        type='number'
        value={numberOfCharts}
        onChange={(e) => setNumberOfCharts(parseInt(e.target.value, 10))}
        variant='outlined'
        fullWidth
        margin='normal'
        inputProps={{ min: 1 }}
      />
    </Box>
  );
};

RowContainer.craft = {
  displayName: 'Row Container',
  rules: {
    canMoveIn: () => false, // Prevent other components from being added inside
  },
  related: {
    settings: RowContainerSettings,
  },
};
