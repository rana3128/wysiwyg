import React from 'react';
import { useDrop } from 'react-dnd';
import Header from './Header';
import Content from './Content';
import Chart from './Chart';
import Table from './Table';

interface CardProps {
  id: string;
  preview: boolean;
  removeComponent: () => void;
  components: any[];
  setComponents: React.Dispatch<React.SetStateAction<ComponentType[]>>;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface ComponentType {
  id: number;
  type: string;
  components: any[];
  position: { x: number; y: number };
  size: { width: number; height: number };
  gridLayout: { i: string, x: number, y: number, w: number, h: number };
}

const Card: React.FC<CardProps> = ({ id, preview, removeComponent, components = [], setComponents, position, size }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ['header', 'content', 'chart', 'table'],
    drop: (item) => {
      const updatedComponents = [...components, item];
      setComponents((prevComponents) => {
        return prevComponents.map((component) => {
          if (component.id.toString() === id) {
            return { ...component, components: updatedComponents };
          }
          return component;
        });
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  const renderComponent = (component: any, index: number) => {
    switch (component.type) {
      case 'header':
        return (
          <Header
            key={index}
            preview={preview}
            removeComponent={() => {
              const updatedComponents = components.filter((_, i) => i !== index);
              setComponents((prevComponents) => {
                return prevComponents.map((component) => {
                  if (component.id.toString() === id) {
                    return { ...component, components: updatedComponents };
                  }
                  return component;
                });
              });
            }}
          />
        );
      case 'content':
        return (
          <Content
            key={index}
            preview={preview}
            removeComponent={() => {
              const updatedComponents = components.filter((_, i) => i !== index);
              setComponents((prevComponents) => {
                return prevComponents.map((component) => {
                  if (component.id.toString() === id) {
                    return { ...component, components: updatedComponents };
                  }
                  return component;
                });
              });
            }}
          />
        );
      case 'chart':
        return (
          <Chart
            key={index}
            preview={preview}
            removeComponent={() => {
              const updatedComponents = components.filter((_, i) => i !== index);
              setComponents((prevComponents) => {
                return prevComponents.map((component) => {
                  if (component.id.toString() === id) {
                    return { ...component, components: updatedComponents };
                  }
                  return component;
                });
              });
            }}
          />
        );
      case 'table':
        return (
          <Table
            key={index}
            preview={preview}
            removeComponent={() => {
              const updatedComponents = components.filter((_, i) => i !== index);
              setComponents((prevComponents) => {
                return prevComponents.map((component) => {
                  if (component.id.toString() === id) {
                    return { ...component, components: updatedComponents };
                  }
                  return component;
                });
              });
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div ref={drop} style={{ height: '100%', width: '100%', position: 'relative', overflow: 'auto', background: isOver ? '#f0f0f0' : 'white' }}>
      {!preview ? (
        <button className="remove-element-btn" onClick={removeComponent} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
          X
        </button>
      ) : null}
      {components.map((component, index) => renderComponent(component, index))}
    </div>
  );
};

export default Card;
