import React from 'react';
import { useDrop } from 'react-dnd';
import { Rnd } from 'react-rnd';
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
}

const Card: React.FC<CardProps> = ({ id, preview, removeComponent, components = [], setComponents, position, size }) => {
  console.log('Card components:', components); // Debugging
  console.log('Card components type:', typeof components); // Debugging
  console.log('Card components isArray:', Array.isArray(components)); // Debugging

  const [{ isOver }, drop] = useDrop({
    accept: ['header', 'content', 'chart', 'table'],
    drop: (item) => {
      const updatedComponents = [...components, item];
      console.log('Updated components:', updatedComponents); // Debugging
      setComponents((prevComponents) => {
        return prevComponents.map((component) => {
          if (component.id === Number(id)) {
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
        return <Header key={index} preview={preview} removeComponent={() => {
          const updatedComponents = components.filter((_, i) => i !== index);
          setComponents((prevComponents) => {
            return prevComponents.map((component) => {
              if (component.id === Number(id)) {
                return { ...component, components: updatedComponents };
              }
              return component;
            });
          });
        }} />;
      case 'content':
        return <Content key={index} preview={preview} removeComponent={() => {
          const updatedComponents = components.filter((_, i) => i !== index);
          setComponents((prevComponents) => {
            return prevComponents.map((component) => {
              if (component.id === Number(id)) {
                return { ...component, components: updatedComponents };
              }
              return component;
            });
          });
        }} />;
      case 'chart':
        return <Chart key={index} removeComponent={() => {
          const updatedComponents = components.filter((_, i) => i !== index);
          setComponents((prevComponents) => {
            return prevComponents.map((component) => {
              if (component.id === Number(id)) {
                return { ...component, components: updatedComponents };
              }
              return component;
            });
          });
        }} />;
      case 'table':
        return <Table key={index} removeComponent={() => {
          const updatedComponents = components.filter((_, i) => i !== index);
          setComponents((prevComponents) => {
            return prevComponents.map((component) => {
              if (component.id === Number(id)) {
                return { ...component, components: updatedComponents };
              }
              return component;
            });
          });
        }} />;
      default:
        return null;
    }
  };

  const handleDragStop = (e: any, d: any) => {
    setComponents((prevComponents) => {
      return prevComponents.map((component) => {
        if (component.id === Number(id)) {
          return { ...component, position: { x: d.x, y: d.y } };
        }
        return component;
      });
    });
  };

  const handleResizeStop = (e: any, direction: any, ref: any, delta: any, position: any) => {
    setComponents((prevComponents) => {
      return prevComponents.map((component) => {
        if (component.id === Number(id)) {
          return { ...component, size: { width: ref.style.width, height: ref.style.height }, position: { x: position.x, y: position.y } };
        }
        return component;
      });
    });
  };

  if (!Array.isArray(components)) {
    console.error('components is not an array:', components);
    return null;
  }

  return (
    <Rnd
      style={{ border: '1px solid black', padding: '10px', background: 'white', marginBottom: '10px' }}
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
    >
      <div ref={drop} style={{ height: '100%', width: '100%', position: 'relative', overflow: 'auto', background: isOver ? '#f0f0f0' : 'white' }}>
        <button onClick={removeComponent} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
          X
        </button>
        {components.map((component, index) => renderComponent(component, index))}
      </div>
    </Rnd>
  );
};

export default Card;
