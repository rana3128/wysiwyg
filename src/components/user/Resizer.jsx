import React, { useMemo, useEffect, useState, useRef } from 'react';
import { useNode } from '@craftjs/core';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Highcharts from 'highcharts';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Resizer = ({ children }) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
    nodeWidth,
  } = useNode((node) => ({
    nodeWidth: node.data.props.width || 4,
  }));

  const containerRef = useRef(null); // Ref to measure container height
  const [containerHeight, setContainerHeight] = useState(350); // Default height

  const layout = useMemo(
    () => [
      {
        i: '1',
        x: 0,
        y: 0,
        w: nodeWidth,
        h: Math.ceil(containerHeight / 30), // Calculate height in rows
        minW: 4,
        maxW: 12,
        isResizable: true,
        isDraggable: false,
        static: true,
      },
    ],
    [nodeWidth, containerHeight]
  );

  const handleResizeStop = (layout) => {
    const updatedWidth = layout[0].w;
    
    setProp((props) => {
      props.width = updatedWidth;
    });

    // Trigger chart redraw after resizing
    setTimeout(() => {
      Highcharts.charts.forEach(chart => {
        if (chart) {
          chart.reflow(); // Redraw the chart to fit the new container size
        }
      });
    }, 300); // Add a slight delay to ensure the DOM updates
  };

  useEffect(() => {
    // Initial chart render
    Highcharts.charts.forEach(chart => {
      if (chart) {
        chart.reflow(); // Ensure chart is rendered correctly on initial load
      }
    });
  }, []);

  useEffect(() => {
    // Update the container height based on the content's height
    if (containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <ResponsiveGridLayout
      autoSize={true}
      width={1200}
      rowHeight={30}
      layouts={{ lg: layout }}
      allowOverlap={false}
      className="layout"
      cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      onResizeStop={(currentLayout, oldItem, newItem) => {
        handleResizeStop([newItem]);
      }}
      isDraggable={false}
      resizeHandles={['e']}
      isResizable={true}
    >
      <div
        key="1"
        ref={(ref) => {
          connect(drag(ref));
          containerRef.current = ref;
        }}
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          height: `${containerHeight}px`, // Dynamic height based on content
          width: '100%',
        }}
      >
        <div style={{ width: '100%', height: '100%' }}>
          {children}
        </div>
      </div>
    </ResponsiveGridLayout>
  );
};

export default Resizer;
