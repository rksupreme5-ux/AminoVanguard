import torch
import torch.nn as nn
import torch.nn.functional as F

class BindingAffinityGNN(nn.Module):
    """
    Message Passing Graph Neural Network for Protein-Ligand Interface Scoring.
    """
    def __init__(self, node_features: int = 74, hidden_dim: int = 128):
        super(BindingAffinityGNN, self).__init__()
        self.embedding = nn.Linear(node_features, hidden_dim)
        self.attention = nn.MultiheadAttention(embed_dim=hidden_dim, num_heads=4)
        self.fc1 = nn.Linear(hidden_dim, 64)
        self.fc2 = nn.Linear(64, 1)

    def forward(self, node_matrix: torch.Tensor, adjacency: torch.Tensor) -> torch.Tensor:
        x = F.relu(self.embedding(node_matrix))
        x = x.unsqueeze(1) 
        attn_output, _ = self.attention(x, x, x)
        x = attn_output.squeeze(1)
        graph_embedding = torch.mean(x, dim=0)
        out = F.relu(self.fc1(graph_embedding))
        score = self.fc2(out)
        return score