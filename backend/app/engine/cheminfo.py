import torch
import random
import time

def parse_complex_to_tensors(protein_filename: str, ligand_filename: str, device: torch.device):
    """Simulates extraction of molecular topology."""
    time.sleep(0.4) 
    node_features = torch.rand(150, 74).to(device) 
    adjacency_matrix = torch.rand(150, 150).to(device)
    return node_features, adjacency_matrix

def generate_admet_profile():
    """Simulates QSAR descriptors for ADMET properties."""
    return {
        "Absorption": random.randint(70, 100),
        "Distribution": random.randint(50, 90),
        "Metabolism": random.randint(40, 80),
        "Excretion": random.randint(60, 95),
        "Toxicity_Risk": random.randint(5, 30)
    }