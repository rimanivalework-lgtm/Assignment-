// inputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  // Define connection handles for this node
  const handles = [
    {
      id: 'value',
      type: 'source',
      position: Position.Right,
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      handles={handles}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '12px' }}>
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        </label>
        <label style={{ fontSize: '12px' }}>
          Type:
          <select
            value={inputType}
            onChange={handleTypeChange}
            style={{ width: '100%' }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
