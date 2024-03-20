import React from 'react';
import { Canvas} from "@react-three/fiber"
import './styles/App.css';
import { Scene } from './scenes/Scene';

function App() {
  return (
    <div className="App">
      <Canvas id='canvas'>
        <Scene>

        </Scene>
      </Canvas>
    </div>
  );
}

export default App;
