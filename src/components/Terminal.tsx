'use client';
import { useState, useEffect } from 'react';

export default function Terminal() {
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