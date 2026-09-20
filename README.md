# AminoVanguard 🧬
**A local-first, GNN-driven pipeline for rapid protein-ligand interface profiling and ADMET topology visualization.**

AminoVanguard is a high-performance computational biology dashboard designed to predict binding affinities (ΔG) and visualize molecular docking interfaces without the computational overhead of full-scale Molecular Dynamics (MD) simulations. 

Engineered specifically for local execution on a 24GB RAM constraint, the architecture decouples a PyTorch-based inference engine from a hardware-accelerated WebGL frontend.

## 🏗️ System Architecture
The application operates on a strict bipartite monorepo structure:
* **The Inference Engine (Backend):** Built on FastAPI, leveraging a simulated Message Passing Graph Neural Network (GNN) via PyTorch. It processes spatial distance matrices and pharmacophoric node features.
* **The Visualizer (Frontend):** A Next.js (React) multi-pane dashboard utilizing `3Dmol.js` for real-time WebGL rendering of complex protein structures and molecular surfaces.

## 🚀 Quick Start (Ubuntu / WSL)

### 1. Boot the Backend (PyTorch / FastAPI)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000