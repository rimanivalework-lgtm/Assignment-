// newNodes.js
// This file contains 5 new node types demonstrating the flexibility of BaseNode

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useState } from 'react';

// 1. Filter Node: Filters data based on a condition
export const FilterNode = ({ id, data }) => {
    const handles = [
        { id: 'in', type: 'target', position: Position.Left },
        { id: 'out', type: 'source', position: Position.Right }
    ];

    return (
        <BaseNode id={id} data={data} title="Filter" handles={handles}>
            <div style={{ fontSize: '12px' }}>
                <label>
                    Condition:
                    <input type="text" placeholder="e.g. x > 5" style={{ width: '100%' }} />
                </label>
            </div>
        </BaseNode>
    );
};

// 2. Transform Node: Transforms input JSON
export const TransformNode = ({ id, data }) => {
    const handles = [
        { id: 'in', type: 'target', position: Position.Left },
        { id: 'out', type: 'source', position: Position.Right }
    ];

    return (
        <BaseNode id={id} data={data} title="Transform" handles={handles}>
            <div style={{ fontSize: '12px' }}>
                <label>
                    Mapping:
                    <input type="text" placeholder="{ key: value }" style={{ width: '100%' }} />
                </label>
            </div>
        </BaseNode>
    );
};

// 3. Join Node: Joins two inputs
export const JoinNode = ({ id, data }) => {
    const handles = [
        { id: 'a', type: 'target', position: Position.Left, style: { top: '33%' } },
        { id: 'b', type: 'target', position: Position.Left, style: { top: '66%' } },
        { id: 'result', type: 'source', position: Position.Right }
    ];

    return (
        <BaseNode id={id} data={data} title="Join" handles={handles}>
            <div style={{ fontSize: '12px' }}>
                <span>Joins A and B</span>
                <select style={{ width: '100%' }}>
                    <option>Concatenate</option>
                    <option>Merge</option>
                </select>
            </div>
        </BaseNode>
    );
};

// 4. API Node: Makes an API call
export const APINode = ({ id, data }) => {
    const handles = [
        { id: 'trigger', type: 'target', position: Position.Left },
        { id: 'params', type: 'target', position: Position.Left, style: { top: '60%' } },
        { id: 'response', type: 'source', position: Position.Right }
    ];

    return (
        <BaseNode id={id} data={data} title="API Call" handles={handles}>
            <div style={{ fontSize: '12px' }}>
                <input type="text" placeholder="https://api.example.com" style={{ width: '100%' }} />
                <select style={{ width: '100%', marginTop: '5px' }}>
                    <option>GET</option>
                    <option>POST</option>
                </select>
            </div>
        </BaseNode>
    );
};

// 5. Database Node: Queries a database
export const DatabaseNode = ({ id, data }) => {
    const handles = [
        { id: 'query', type: 'target', position: Position.Left },
        { id: 'result', type: 'source', position: Position.Right }
    ];

    return (
        <BaseNode id={id} data={data} title="Database" handles={handles}>
            <div style={{ fontSize: '12px' }}>
                <textarea placeholder="SELECT * FROM users" style={{ width: '100%', height: '40px', resize: 'none' }} />
            </div>
        </BaseNode>
    );
};
