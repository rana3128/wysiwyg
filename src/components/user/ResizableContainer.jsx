import React from 'react';
import { useNode } from '@craftjs/core';
import Resizer from './Resizer'; // Import the Resizer component

export const ResizableContainer = ({ children }) => {
  const { connectors: { connect } } = useNode();

  return (
    <Resizer propKey={{ width: 'width' }}>
      <div ref={ref => connect(ref)} style={{ width: '100%' }}>
        {children}
      </div>
    </Resizer>
  );
};

ResizableContainer.craft = {
  displayName: 'Resizable Container',
};
