import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Editor from './components/Editor';

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', height: '98vh' }}>
        <Editor />
      </div>
    </DndProvider>
  );
};

export default App;
