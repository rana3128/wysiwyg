import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface HeaderProps {
  preview: boolean;
  removeComponent: () => void;
}

const Header: React.FC<HeaderProps> = ({ preview, removeComponent }) => {
  const [text, setText] = useState('Header Text');

  return (
    <div style={{ marginBottom: '10px', position: 'relative' }}>
      <button onClick={removeComponent} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
        X
      </button>
      {preview ? (
        <div dangerouslySetInnerHTML={{ __html: text }} />
      ) : (
        <ReactQuill value={text} onChange={setText} />
      )}
    </div>
  );
};

export default Header;
