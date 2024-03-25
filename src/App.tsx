import React from 'react';
import { Canvas } from "@react-three/fiber"
import './styles/App.css';
import { Scene } from './scenes/Scene';
import { Physics } from '@react-three/cannon';
import { initFpsStats } from './components/FpsStats';

function App() {
  initFpsStats()
  return (
    <div className="flex h-screen">
      <Canvas id='canvas'>
        <Physics
          broadphase='SAP'
          gravity={[0, 0, 0]}>
          <Scene />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
