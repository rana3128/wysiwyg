import React, { useState } from 'react';
import Layout from './Layout';
import Sidebar from './Sidebar';
import yaml from 'js-yaml';

interface ComponentType {
  id: number;
  type: string;
  components: any[];
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const Editor: React.FC = () => {
  const [components, setComponents] = useState<ComponentType[]>([]);
  const [preview, setPreview] = useState(false);

  const addComponent = (component: Partial<ComponentType>) => {
    setComponents([...components, { 
      ...component, 
      id: components.length, 
      components: component.components || [], 
      position: component.position || { x: 0, y: 0 }, 
      size: component.size || { width: 320, height: 200 } 
    } as ComponentType]);
  };

  const addComponentToLayout = (component: Partial<ComponentType>) => {
    setComponents([...components, { 
      ...component, 
      id: components.length, 
      components: component.components || [], 
      position: component.position || { x: 0, y: 0 }, 
      size: component.size || { width: 320, height: 200 } 
    } as ComponentType]);
  };

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
          setComponents((loadedComponents as any[]).map(component => ({
            ...component,
            components: component.components || [],
            position: component.position || { x: 0, y: 0 },
            size: component.size || { width: 320, height: 200 }
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
      {!preview && <Sidebar addComponent={addComponent} />}
      <Layout 
        components={components} 
        addComponentToLayout={addComponentToLayout} 
        preview={preview} 
        removeComponent={removeComponent} 
        setComponents={setComponents} 
      />
      <button onClick={handlePreview} style={{ position: 'absolute', top: '10px', right: '10px' }}>
        {preview ? 'Edit' : 'Preview'}
      </button>
      <button onClick={handleSave} style={{ position: 'absolute', top: '50px', right: '10px' }}>
        Save
      </button>
      <input
        type="file"
        accept=".yaml"
        onChange={handleLoad}
        style={{ position: 'absolute', top: '90px', right: '10px' }}
      />
    </div>
  );
};

export default Editor;
