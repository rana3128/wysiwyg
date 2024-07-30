import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const SidebarItem = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#ddd',
      }}
    >
      {label}
    </div>
  );
};

const Sidebar = () => (
  <div className="sidebar">
    <SidebarItem type="card" label="Card" />
    <SidebarItem type="header" label="Header" />
    <SidebarItem type="content" label="Content" />
    <SidebarItem type="chart" label="Chart" />
    <SidebarItem type="table" label="Table" />
  </div>
);

export default Sidebar;
