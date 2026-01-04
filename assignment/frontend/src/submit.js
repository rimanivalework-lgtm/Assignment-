// submit.js
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        try {
            // Send a POST request to the backend
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Display the result in a user-friendly alert
            alert(`Pipeline Analysis:\n\nNumber of Nodes: ${data.num_nodes}\nNumber of Edges: ${data.num_edges}\nIs DAG: ${data.is_dag}`);
        } catch (error) {
            console.error('Error parsing pipeline:', error);
            alert('Error parsing pipeline. Please ensure the backend is running on http://127.0.0.1:8000.');
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button
                type="submit"
                onClick={handleSubmit}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginTop: '10px'
                }}
            >
                Submit
            </button>
        </div>
    );
}
