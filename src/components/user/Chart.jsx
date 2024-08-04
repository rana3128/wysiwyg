import React, { useState, useEffect } from 'react';
import { useNode } from '@craftjs/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartSettings } from './ChartSettings';
import { Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { mockFetchAvailableQueries, mockFetchSeriesData } from './mockServer';

export const Chart = ({
  queries = [],
  selectedQuery = '',
  aggregator = '',
  serviceName = '',
  title = 'Custom Chart',
  isCollapsed = false,
}) => {
  const { connectors: { connect, drag } } = useNode();
  const [seriesData, setSeriesData] = useState([]);
  const [collapsed, setCollapsed] = useState(isCollapsed);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedQuery && aggregator && serviceName) {
        const payload = { query: selectedQuery, aggregator, serviceName };
        const data = await mockFetchSeriesData(payload);
        setSeriesData(data);
      }
    };
    fetchData();
  }, [selectedQuery, aggregator, serviceName]);

  const options = {
    title: { text: title },
    series: [{
      name: `${selectedQuery} - ${aggregator}`,
      data: seriesData.map(d => d.count),
    }],
    xAxis: { categories: seriesData.map(d => `${d.time_from} - ${d.time_to}`) },
  };

  return (
    <div ref={ref => connect(drag(ref))}>
      <IconButton onClick={() => setCollapsed(!collapsed)} color='primary'>
        {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </IconButton>
      <Collapse in={!collapsed}>
        <div style={{ width: '90%', height: '500px' }}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </Collapse>
    </div>
  );
};

const ChartDefaultProps = {
  queries: [],
  selectedQuery: '',
  aggregator: '',
  serviceName: '',
  title: 'Custom Chart',
  isCollapsed: false,
};

Chart.craft = {
  props: ChartDefaultProps,
  related: {
    settings: ChartSettings,
  },
};
