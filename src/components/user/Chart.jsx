import React, { useState, useEffect } from "react";
import { useNode } from "@craftjs/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ChartSettings } from "./ChartSettings";
import { Collapse, IconButton, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { mockFetchSeriesData } from "./mockServer";

export const Chart = ({
  series,
  title = "Custom Chart",
  isCollapsed = false,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const [seriesData, setSeriesData] = useState([]);
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const [chartOption, setChartOption] = useState({
    title: { text: '' }, // Remove title from the chart
    series: [],
    xAxis: {
      categories: [],
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [series]);

  useEffect(() => {
    const options = {
      title: { text: '' }, // Remove title from the chart
      series: generateSeriesOption(),
      xAxis: {
        categories: seriesData?.[0]?.data?.map(
          (d) => `${new Date(d.time_from).getMinutes()} - ${new Date(d.time_to).getMinutes()}`
        ),
      },
    };
    setChartOption(options);
  }, [seriesData]);

  useEffect(()=>{
    setCollapsed(isCollapsed);
  }, [isCollapsed])

  const fetchData = async () => {
    const chartData = [];
    for (const sr of series) {
      const payload = { source: sr.source, field: sr.field };
      const data = await mockFetchSeriesData(payload);
      chartData.push({ field: sr.field, data });
    }
    setSeriesData(chartData);
  };

  const generateSeriesOption = () => {
    return seriesData.map((srData) => {
      return {
        name: srData.field,
        data: srData.data.map((d) => d.count),
      };
    });
  };

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={() => setCollapsed(!collapsed)} color="primary">
            {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </Grid>
      </Grid>
      <Collapse in={!collapsed}>
        <div style={{ width: "100%", height: "500px" }}>
          <HighchartsReact highcharts={Highcharts} options={chartOption} />
        </div>
      </Collapse>
    </div>
  );
};

const ChartDefaultProps = {
  series: [],
  title: "Custom Chart",
  isCollapsed: false,
};

Chart.craft = {
  props: ChartDefaultProps,
  related: {
    settings: ChartSettings,
  },
};
