import React, { useState, useEffect } from "react";
import { useNode } from "@craftjs/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ChartSettings } from "./ChartSettings";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { mockFetchSeriesData } from "./mockServer";

export const Chart = ({
  series,
  title = "Custom Chart",
  isCollapsed = false,
  width = "100%", // Added width prop with default value
}) => {
  console.log(width);
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

  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);

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
    return seriesData.map((srData) => ({
      name: srData.field,
      data: srData.data.map((d) => d.count),
    }));
  };

  return (
    <Box sx={{ width }} ref={(ref) => connect(drag(ref))}>
      <Accordion expanded={!collapsed} onChange={() => setCollapsed(!collapsed)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="h6">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ width: "100%" }}>
            <HighchartsReact highcharts={Highcharts} options={chartOption} />
          </div>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

const ChartDefaultProps = {
  series: [],
  title: "Custom Chart",
  isCollapsed: false,
  width: "100%", // Added width to default props
};

Chart.craft = {
  props: ChartDefaultProps,
  related: {
    settings: ChartSettings,
  },
};
