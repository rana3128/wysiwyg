import React from 'react';

const ComponentRenderer = ({ type }) => {
  switch (type) {
    case 'header':
      return <div className="header">Header</div>;
    case 'content':
      return <div className="content">Content</div>;
    case 'chart':
      return <div className="chart">Chart</div>;
    case 'table':
      return <div className="table">Table</div>;
    case 'card':
    default:
      return <div className="card">Card</div>;
  }
};

export default ComponentRenderer;
