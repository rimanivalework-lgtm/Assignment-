// BaseNode.js
import { Handle, Position } from 'reactflow';

// BaseNode reusable component
// Used classes defined in index.css for consistent styling:
// - base-node: Container style (white bg, border, shadow, rounded)
// - node-title: Header style (gray bg, border bottom, bold)
// - node-content: Content padding and layout

export const BaseNode = ({ id, data, title, handles = [], children, style }) => {
    return (
        <div
            className="base-node"
            style={{
                ...style
            }}
        >
            {/* Node Title */}
            {title && (
                <div className="node-title">
                    {title}
                </div>
            )}

            {/* Node Content (Inputs, Selects, etc.) */}
            <div className="node-content">
                {children}
            </div>

            {/* Dynamically Render Handles */}
            {handles.map((handle, index) => (
                <Handle
                    key={`${id}-${handle.id}-${index}`}
                    type={handle.type}
                    position={handle.position}
                    id={`${id}-${handle.id}`}
                    style={handle.style} // Allow individual handle styling
                />
            ))}
        </div>
    );
};
