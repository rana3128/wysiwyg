import React from 'react';
import { useDrag } from 'react-dnd';

interface SidebarProps {
  addComponent: (component: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ addComponent }) => {
  const createDraggableItem = (type: string) => ({
    type,
    item: { type },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, dragCard] = useDrag(() => createDraggableItem('card'));
  const [, dragHeader] = useDrag(() => createDraggableItem('header'));
  const [, dragContent] = useDrag(() => createDraggableItem('content'));
  const [, dragChart] = useDrag(() => createDraggableItem('chart'));
  const [, dragTable] = useDrag(() => createDraggableItem('table'));

  return (
    <div style={{ width: '200px', borderRight: '1px solid gray', padding: '10px' }}>
      <h3>Components</h3>
      <div ref={dragCard} style={{ cursor: 'pointer', padding: '5px' }}>Card</div>
      <div ref={dragHeader} style={{ cursor: 'pointer', padding: '5px' }}>Header</div>
      <div ref={dragContent} style={{ cursor: 'pointer', padding: '5px' }}>Content</div>
      <div ref={dragChart} style={{ cursor: 'pointer', padding: '5px' }}>Chart</div>
      <div ref={dragTable} style={{ cursor: 'pointer', padding: '5px' }}>Table</div>
    </div>
  );
};

export default Sidebar;
