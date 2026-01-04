from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request body
class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Check for DAG (Directed Acyclic Graph)
    # Build adjacency list
    adj_list = {node['id']: [] for node in nodes}
    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in adj_list:
            adj_list[source].append(target)
            
    # DFS for cycle detection
    visited = set()
    recursion_stack = set()
    
    def has_cycle(node):
        visited.add(node)
        recursion_stack.add(node)
        
        for neighbor in adj_list.get(node, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in recursion_stack:
                return True
                
        recursion_stack.remove(node)
        return False
        
    is_dag = True
    for node in adj_list:
        if node not in visited:
            if has_cycle(node):
                is_dag = False
                break
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
