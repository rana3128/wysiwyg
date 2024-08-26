import React, { useState, useEffect } from "react";
import { useNode } from "@craftjs/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ChartSettings } from "./ChartSettings";
import { Box } from "@mui/material";
import { mockFetchSeriesData } from "./mockServer";
import { ResizableContainer } from "./ResizableContainer";
import Resizer from "./Resizer"; // Import the Resizer component

export const Chart = ({
  series,
  title = "Custom Chart",
  width = "100%", // Added width prop with default value
}) => {
  const {
    connectors: { connect },
  } = useNode();
  const [seriesData, setSeriesData] = useState([]);
  const [chartOption, setChartOption] = useState({
    title: { text: "" }, // Remove title from the chart
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
      title: { text: title },
      series: generateSeriesOption(),
      xAxis: {
        categories: seriesData?.[0]?.data?.map(
          (d) =>
            `${new Date(d.time_from).getMinutes()} - ${new Date(
              d.time_to
            ).getMinutes()}`
        ),
      },
    };
    setChartOption(options);
  }, [seriesData]);

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
    <div ref={(ref) => connect(ref)} style={{ width: `calc(${width} - 10px)` }}>
      <HighchartsReact highcharts={Highcharts} options={chartOption} />
    </div>
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
