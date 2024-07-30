import React, { useState } from 'react';
import Sidebar from './Sidebar';
import yaml from 'js-yaml';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import ComponentRenderer from './ComponentRenderer';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface ComponentType {
  id: number;
  type: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  gridLayout: { i: string, x: number, y: number, w: number, h: number };
}

const Editor: React.FC = () => {
  const [components, setComponents] = useState<ComponentType[]>([]);
  const [preview, setPreview] = useState(false);
  const [newCounter, setNewCounter] = useState(0);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.COMPONENT,
    drop: (item: { type: string }, monitor) => {
      const offset = monitor.getClientOffset();
      const id = newCounter;
      const newComponent = {
        id,
        type: item.type,
        position: { x: 0, y: 0 },
        size: { width: 4, height: 2 },
        gridLayout: { i: id.toString(), x: 0, y: Infinity, w: 4, h: 2 },
      };
      setNewCounter(newCounter + 1);
      setComponents([...components, newComponent]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handlePreview = () => {
    setPreview(!preview);
  };

  const handleSave = () => {
    const yamlStr = yaml.dump(components);
    const blob = new Blob([yamlStr], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template.yaml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === 'string') {
          const loadedComponents = yaml.load(content);
          setComponents((loadedComponents as any[]).map((component, index) => ({
            ...component,
            id: index,
            components: component.components || [],
            position: component.position || { x: 0, y: 0 },
            size: component.size || { width: 320, height: 200 },
            gridLayout: component.gridLayout || { i: index.toString(), x: 0, y: Infinity, w: 4, h: 2 },
          } as ComponentType)));
        }
      };
      reader.readAsText(file);
    }
  };

  const removeComponent = (id: string) => {
    setComponents(components.filter((component) => component.id.toString() !== id));
  };

  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <Sidebar />
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }} ref={drop}>
        <div className="layout-top-btns-ctn">
          <button className="layout-top-btn" onClick={handlePreview} style={{ position: 'relative' }}>
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button className="layout-top-btn" onClick={handleSave} style={{ position: 'relative' }}>
            Save
          </button>
          <input className="custom-file-upload" type="file" accept=".yaml" onChange={handleLoad} style={{ position: 'relative' }} />
        </div>
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: components.map(c => c.gridLayout) }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          isDroppable={true}
        >
          {components.map(component => (
            <div key={component.id.toString()} data-grid={component.gridLayout}>
              <div className="card">
                {!preview ? (
                  <button onClick={() => removeComponent(component.id.toString())} className="remove-element-btn">
                    X
                  </button>
                ) : null}
                <ComponentRenderer type={component.type} />
              </div>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default Editor;
