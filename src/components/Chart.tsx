import React from 'react';

interface ChartProps {
  removeComponent: () => void;
}

const Chart: React.FC<ChartProps> = ({ removeComponent }) => {
  return (
    <div style={{ border: '1px solid blue', padding: '10px', margin: '10px 0', position: 'relative' }}>
      <button onClick={removeComponent} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
        X
      </button>
      Chart Component
    </div>
  );
};

export default Chart;
