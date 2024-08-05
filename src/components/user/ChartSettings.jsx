import React, { useState, useEffect } from 'react';
import { useNode } from '@craftjs/core';
import {
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Box,
} from '@mui/material';

export const ChartSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }));
  const [source, setSource] = useState('');
  const [field, setField] = useState('');
  const [title, setTitle] = useState(props.title || 'Custom Chart');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    setProp((props) => {
      props.title = title;
      props.isCollapsed = isCollapsed;
    });
  }, [title, isCollapsed]);

  const addSeries = () => {
    if(!source || !field) return;
    setSeries([...series, {source, field}])
    setProp((props) => {
      props.series = [...series, {source, field}];
    });
    setSource("")
    setField("")
  }

  return (
    <Box className='chart-setting-panel' p={2}>
       <TextField
        label='Chart Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant='outlined'
        fullWidth
        margin='normal'
      />
      <FormControlLabel
        control={
          <Switch
            checked={isCollapsed}
            onChange={(e) => setIsCollapsed(e.target.checked)}
            color='primary'
          />
        }
        label='Collapse Chart Initially'
      />

      {series.map(sr => <>{sr.source} {sr.field} <br /></>)}

      <TextField
        label='Source'
        value={source}
        onChange={(e) => setSource(e.target.value)}
        variant='outlined'
        fullWidth
        margin='normal'
      />
      <TextField
        label='Source Field'
        value={field}
        onChange={(e) => setField(e.target.value)}
        variant='outlined'
        fullWidth
        margin='normal'
      />
      <Button color='primary' variant='contained' fullWidth onClick={addSeries} >
        Add Series
      </Button>
      
    </Box>
  );
};
