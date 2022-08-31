import { Canvas } from "@react-three/fiber";
import CameraControls from "./CameraControls";
import Globe from "./Globe";

export default function GlobeScene() {
  return (
    <Canvas>
      <CameraControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Globe lodLevel={1} latTiles={10} lonTiles={10} />
    </Canvas>
  );
}
