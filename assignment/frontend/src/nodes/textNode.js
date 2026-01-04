// textNode.js
import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const textareaRef = useRef(null);

  // 1. Variable Detection Logic
  // We want to detect variable names enclosed in double curly braces {{ variableName }}.
  // We use a regex to find all matches.
  useEffect(() => {
    // Regex pattern: {{ followed by variable name (valid JS identifier) followed by }}
    // [a-zA-Z_$][a-zA-Z0-9_$]* mimics standard JS variable naming rules
    const variableRegex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

    const matches = [];
    let match;
    while ((match = variableRegex.exec(currText)) !== null) {
      // match[1] is the captured variable name
      matches.push(match[1]);
    }

    // Filter unique variables to avoid duplicate handles
    const uniqueVariables = [...new Set(matches)];

    // Create handles for each unique variable
    const newHandles = uniqueVariables.map((variable, index) => ({
      id: variable,
      type: 'target',
      position: Position.Left,
      // Distribute handles vertically. 
      // Logic: specific spacing or even distribution. 
      // Simple approach: calculate top position based on index.
      // We start a bit down to leave room for the header.
      style: { top: `${(index + 1) * 20 + 50}px` }
    }));

    // Always include the output handle on the right
    newHandles.push({
      id: 'output',
      type: 'source',
      position: Position.Right
    });

    setHandles(newHandles);
  }, [currText]);


  // 2. Auto-resizing Logic
  // Adjust height of the textarea based on content
  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    autoResize(e.target);
  };

  const autoResize = (element) => {
    if (!element) return;
    element.style.height = 'auto'; // Reset height to calculate scrollHeight
    element.style.height = `${element.scrollHeight}px`;
  };

  // Initial resize on mount
  useEffect(() => {
    if (textareaRef.current) {
      autoResize(textareaRef.current);
    }
  }, []);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      handles={handles}
      style={{ height: 'auto', minHeight: '100px' }} // Dynamic height for the container
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', color: '#64748b' }}>
          Text:
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            rows={1}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              minHeight: '32px',
              overflow: 'hidden',
              resize: 'none', // Disable manual resize handle
              fontFamily: 'inherit'
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
}
