// outputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handles = [
    {
      id: 'value',
      type: 'target',
      position: Position.Left,
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
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
            value={outputType}
            onChange={handleTypeChange}
            style={{ width: '100%' }}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
