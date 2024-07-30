import React from 'react';

interface TableProps {
  removeComponent: () => void;
}

const Table: React.FC<TableProps> = ({ removeComponent }) => {
  return (
    <div style={{ border: '1px solid green', padding: '10px', margin: '10px 0', position: 'relative' }}>
      <button onClick={removeComponent} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
        X
      </button>
      Table Component
    </div>
  );
};

export default Table;
