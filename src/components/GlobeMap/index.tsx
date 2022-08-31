import { Detailed } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import CameraControls from "./CameraControls";
import Globe from "./Globe";

export default function GlobeScene() {
  return (
    <Canvas>
      <CameraControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Detailed distances={[3.2, 3.5, 5]}>
        <Globe lodLevel={3} latTiles={20} lonTiles={40} />
        <Globe lodLevel={2} latTiles={10} lonTiles={20} />
        <Globe lodLevel={1} latTiles={5} lonTiles={10} />
      </Detailed>
    </Canvas>
  );
}
