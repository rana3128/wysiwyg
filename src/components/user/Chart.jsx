import React, { useState, useEffect } from 'react';
import { useNode } from '@craftjs/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartSettings } from './ChartSettings';

// Mock function to simulate API response
const mockFetchSeriesData = (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockData = {
                "https://api.example.com/series1": [1, 2, 3, 4, 5, 6],
                "https://api.example.com/series2": [10, 20, 30, 40, 50, 60],
                "https://api.example.com/series3": [100, 200, 300, 400, 500, 600],
            };
            resolve(mockData[url] || []);
        }, 1000);
    });
};

export const Chart = ({ seriesUrls = [] }) => {
    console.log(seriesUrls);
    
    const { connectors: { connect, drag } } = useNode();
    const [seriesData, setSeriesData] = useState([]);

    useEffect(() => {
        
        const fetchData = async () => {
            const data = await Promise.all(seriesUrls.map(url => mockFetchSeriesData(url)));
            setSeriesData(data);
        };
        fetchData();
    }, [seriesUrls]);

    const options = {
        title: {
            text: 'Custom Chart'
        },
        series: seriesData.map((data, index) => ({
            name: `Series ${index + 1}`,
            data: data
        }))
    };

    return (
        <div style={{ width: "90%", height: "250px" }} ref={ref => connect(drag(ref))}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};


const ChartDefaultProps = {
    seriesUrls: ["https://api.example.com/series1"]
};

Chart.craft = {
    props: ChartDefaultProps,
    related: {
        settings: ChartSettings,
    },
};