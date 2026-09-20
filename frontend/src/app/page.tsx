'use client';
import { useEffect, useRef, useState } from 'react';

// ---------------------------------------------------------
// 1. THE TERMINAL COMPONENT
// ---------------------------------------------------------
function Terminal() {
  const [logs, setLogs] = useState<string[]>([
    "AminoVanguard Core v1.0.0 initializing...",
    "Allocating tensors to device: CPU (24GB RAM limit applied)",
    "Ready for sequence ingestion."
  ]);

  useEffect(() => {
    const messages = [
      "[INFO] Constructing distance matrix...",
      "[INFO] Extracting spatial pharmacophores...",
      "[WARN] Steric clash detected at residue TYR-114.",
      "[COMPUTE] Forward pass through GAT layers: complete (42ms).",
      "[INFO] Updating ADMET vectors."
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const msg = messages[Math.floor(Math.random() * messages.length)];
        const timestamp = new Date().toISOString().split('T')[1].slice(0, 12);
        setLogs(prev => [...prev.slice(-15), `${timestamp}  ${msg}`]);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#030303] border border-[#1a1a1a] font-mono text-[11px] p-4 flex flex-col justify-end overflow-hidden text-[#00f0ff]/70">
      {logs.map((log, i) => (
        <div key={i} className="mb-1 hover:text-white transition-colors"><span className="text-[#ff003c]">&gt; </span>{log}</div>
      ))}
      <div className="mt-2 text-white animate-pulse">_</div>
    </div>
  );
}

// ---------------------------------------------------------
// 2. THE 3D WEBGL COMPONENT (Direct CDN Injection)
// ---------------------------------------------------------
function Viewer3D() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inject the library directly into the browser to bypass Next.js restrictions
    const script = document.createElement('script');
    script.src = "https://3Dmol.org/build/3Dmol-min.js";
    script.async = true;
    script.onload = () => {
      const $3Dmol = (window as any).$3Dmol;
      if (viewerRef.current && $3Dmol) {
        setLoading(false);
        const viewer = $3Dmol.createViewer(viewerRef.current, { backgroundColor: 'black' });
        
        // Fetch COVID-19 Main Protease
        fetch('https://files.rcsb.org/view/6LU7.pdb')
          .then((res) => res.text())
          .then((data) => {
            viewer.addModel(data, 'pdb');
            viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
            viewer.zoomTo();
            viewer.render();
          })
          .catch(err => console.error("Failed to load PDB:", err));
      }
    };
    document.body.appendChild(script);

    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <div className="relative w-full h-full border border-[#1a1a1a] rounded-sm bg-[#050505]">
      <div className="absolute top-2 left-2 z-10 text-xs font-mono text-[#00f0ff] uppercase tracking-widest bg-black/50 px-2 py-1">
        Target Receptor Viewport :: WebGL Active
      </div>
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-[#555] font-mono text-xs z-0">
          Initializing WebGL Canvas...
        </div>
      )}
      
      {/* The 3D Engine will attach to this div */}
      <div ref={viewerRef} className="absolute inset-0 w-full h-full z-10" />
    </div>
  );
}

// ---------------------------------------------------------
// 3. THE MASTER DASHBOARD
// ---------------------------------------------------------
export default function Dashboard() {
  return (
    <main className="h-screen w-screen grid grid-cols-[280px_1fr_320px] grid-rows-[1fr_220px] bg-black text-white p-2 gap-2 overflow-hidden">
      
      {/* LEFT SIDEBAR */}
      <aside className="row-span-2 border border-[#1a1a1a] bg-[#050505] flex flex-col p-4">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-[#00f0ff] text-xl">⚡</span>
          <h1 className="font-mono text-lg font-bold tracking-widest uppercase">Amino<span className="text-[#00f0ff]">Vanguard</span></h1>
        </div>
        
        <div className="space-y-6">
          <div className="group border border-dashed border-[#333] hover:border-[#00f0ff] transition-all p-6 text-center cursor-pointer flex flex-col items-center">
            <span className="text-2xl mb-2 opacity-50 group-hover:opacity-100 transition-opacity">☁️</span>
            <p className="text-xs font-mono text-[#888] group-hover:text-[#00f0ff]">Upload Receptor (.pdb)</p>
          </div>

          <div className="group border border-dashed border-[#333] hover:border-[#ff003c] transition-all p-6 text-center cursor-pointer flex flex-col items-center">
            <span className="text-2xl mb-2 opacity-50 group-hover:opacity-100 transition-opacity">☁️</span>
            <p className="text-xs font-mono text-[#888] group-hover:text-[#ff003c]">Upload Ligand (.sdf)</p>
          </div>

          <button className="w-full bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] py-3 text-xs font-mono uppercase tracking-widest hover:bg-[#00f0ff] hover:text-black transition-all flex items-center justify-center gap-2 mt-auto">
            ▶ Run Inference
          </button>
        </div>
      </aside>

      {/* CENTER: 3D Visualization */}
      <section className="relative">
        <Viewer3D />
      </section>

      {/* RIGHT SIDEBAR */}
      <aside className="row-span-2 border border-[#1a1a1a] bg-[#050505] p-4 flex flex-col font-mono">
        <h2 className="text-xs text-[#888] uppercase tracking-widest mb-4">Binding Metrics</h2>
        <div className="bg-[#111] border border-[#222] p-4 rounded-sm mb-6">
          <p className="text-[#555] text-[10px] uppercase">Predicted ΔG (kcal/mol)</p>
          <p className="text-4xl text-white mt-1">-8.45</p>
          <p className="text-[#00f0ff] text-[10px] mt-2">Confidence: 94.2%</p>
        </div>

        <h2 className="text-xs text-[#888] uppercase tracking-widest mb-4 mt-4">System Status</h2>
        <div className="flex-1 flex flex-col gap-2 text-[10px] text-[#555]">
          <div className="flex justify-between border-b border-[#111] pb-1"><span>Backend API</span><span className="text-[#00f0ff]">ONLINE</span></div>
          <div className="flex justify-between border-b border-[#111] pb-1"><span>Device</span><span className="text-white">CPU_24GB</span></div>
          <div className="flex justify-between border-b border-[#111] pb-1"><span>GNN Topology</span><span className="text-[#ff003c]">GAT_ACTIVE</span></div>
        </div>
      </aside>

      {/* BOTTOM: Telemetry */}
      <section className="col-start-2 col-end-3 relative">
        <div className="absolute top-2 right-2 z-10 flex items-center gap-2 text-[10px] text-[#555] font-mono">
          <span className="text-[#ff003c] animate-pulse">🔴</span> Engine Active
        </div>
        <Terminal />
      </section>

    </main>
  );
}