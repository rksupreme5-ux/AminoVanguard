'use client';
import { useEffect, useRef } from 'react';

export default function Viewer3D() {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initViewer = async () => {
      const $3Dmol = (await import('3dmol/build/3Dmol.js')).default;
      
      if (viewerRef.current) {
        const viewer = $3Dmol.createViewer(viewerRef.current, {
          backgroundColor: 'black',
        });
        const pdbUri = 'https://files.rcsb.org/view/6LU7.pdb';
        fetch(pdbUri)
          .then((res) => res.text())
          .then((data) => {
            viewer.addModel(data, 'pdb');
            viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
            viewer.addSurface($3Dmol.SurfaceType.VDW, { opacity: 0.6, color: 'white' });
            viewer.zoomTo();
            viewer.render();
          });
      }
    };
    initViewer();
  }, []);

  return (
    <div className="relative w-full h-full border border-[#1a1a1a] rounded-sm bg-[#050505]">
      <div className="absolute top-2 left-2 z-10 text-xs font-mono text-[#00f0ff] uppercase tracking-widest bg-black/50 px-2 py-1">Target Receptor Viewport :: WebGL Active</div>
      <div ref={viewerRef} className="w-full h-full" />
    </div>
  );
}