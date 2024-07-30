import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

interface LayoutProps {
  components: ComponentType[];
  addComponentToLayout: (component: Partial<ComponentType>) => void;
  preview: boolean;
  removeComponent: (id: string) => void;
  setComponents: React.Dispatch<React.SetStateAction<ComponentType[]>>;
}

interface ComponentType {
  id: number;
  type: string;
  components: any[];
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const Layout: React.FC<LayoutProps> = ({ components, addComponentToLayout, preview, removeComponent, setComponents }) => {
  const [, drop] = useDrop({
    accept: 'card',
    drop: (item:any) => addComponentToLayout(item),
  });

  return (
    <div ref={drop} style={{ flex: 1, padding: '10px', position: 'relative', display: 'flex', flexWrap: 'wrap' }}>
      {components.map((component, index) => {
        if (component.type === 'card') {
          return (
            <Card 
              key={index} 
              id={index.toString()} 
              preview={preview} 
              removeComponent={() => removeComponent(index.toString())} 
              components={component.components} 
              setComponents={setComponents} 
              position={component.position}
              size={component.size}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default Layout;
