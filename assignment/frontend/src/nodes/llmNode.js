// llmNode.js
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {

  // Define handles with specific positioning logic as per original design
  // top 100/3 % and 200/3 % for input handles
  const handles = [
    {
      id: 'system',
      type: 'target',
      position: Position.Left,
      style: { top: `${100 / 3}%` }
    },
    {
      id: 'prompt',
      type: 'target',
      position: Position.Left,
      style: { top: `${200 / 3}%` }
    },
    {
      id: 'response',
      type: 'source',
      position: Position.Right
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      handles={handles}
    >
      <div style={{ fontSize: '12px' }}>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
}
