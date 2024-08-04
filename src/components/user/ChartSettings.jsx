import React, { useState, useEffect } from 'react';
import { useNode } from '@craftjs/core';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Box,
} from '@mui/material';
import { mockFetchAvailableQueries } from './mockServer'; // Import the mock server function

export const ChartSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }));
  const [localQueries, setLocalQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(props.selectedQuery || '');
  const [aggregator, setAggregator] = useState(props.aggregator || '');
  const [serviceName, setServiceName] = useState(props.serviceName || '');
  const [title, setTitle] = useState(props.title || 'Custom Chart');
  const [isCollapsed, setIsCollapsed] = useState(props.isCollapsed || false);
  const [serviceNames] = useState(['entity', 'DSL']); // Example service names

  useEffect(() => {
    const fetchQueries = async () => {
      const data = await mockFetchAvailableQueries();
      setLocalQueries(data);
    };
    fetchQueries();
  }, []);

  useEffect(() => {
    setProp((props) => {
      props.selectedQuery = selectedQuery;
      props.aggregator = aggregator;
      props.serviceName = serviceName;
      props.title = title;
      props.isCollapsed = isCollapsed;
    });
  }, [selectedQuery, aggregator, serviceName, title, isCollapsed, setProp]);

  return (
    <Box className='chart-setting-panel' p={2}>
      <FormControl fullWidth variant='outlined' margin='normal'>
        <InputLabel>Service Name</InputLabel>
        <Select
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          label='Service Name'
        >
          {serviceNames.map((name, index) => (
            <MenuItem key={index} value={name}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth variant='outlined' margin='normal'>
        <InputLabel>Query</InputLabel>
        <Select
          value={selectedQuery}
          onChange={(e) => setSelectedQuery(e.target.value)}
          label='Query'
        >
          {localQueries.map((query, index) => (
            <MenuItem key={index} value={query}>{query}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label='Aggregator'
        value={aggregator}
        onChange={(e) => setAggregator(e.target.value)}
        variant='outlined'
        fullWidth
        margin='normal'
      />
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
      <Button color='primary' variant='contained' fullWidth>
        Update Chart
      </Button>
    </Box>
  );
};
