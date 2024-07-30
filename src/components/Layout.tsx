import React from 'react';
import Card from './Draggable/Card';

interface LayoutProps {
  component: ComponentType;
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
  gridLayout: { i: string, x: number, y: number, w: number, h: number };
}

const Layout: React.FC<LayoutProps> = ({ component, preview, removeComponent, setComponents }) => {
  return (
    <Card
      id={component.id.toString()}
      preview={preview}
      removeComponent={() => removeComponent(component.id.toString())}
      components={component.components}
      setComponents={setComponents}
      position={component.position}
      size={component.size}
    />
  );
};

export default Layout;
