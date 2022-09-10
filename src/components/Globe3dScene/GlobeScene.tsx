import { Canvas } from "@react-three/fiber";
import CameraControls from "./CameraControls";
import { Globe } from "./Globe";

export default function GlobeScene() {
  return (
    <Canvas camera={{ position: [70, 70, 50] }}>
      <CameraControls />
      <ambientLight />
      <pointLight position={[10, 10, 80]} />
      <Globe />
    </Canvas>
  );
}
