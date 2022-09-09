import { Canvas } from "@react-three/fiber";
import CameraControls from "./CameraControls";
import GlobeTile from "./GlobeTile";

export default function GlobeScene() {
  return (
    <Canvas>
      <CameraControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {[...Array(10)].map((_, y) => {
        return [...Array(10)].map((_, x) => {
          const props = {
            lodLevel: -1,
            coordX: x,
            coordY: y,
            tilesX: 10,
            tilesY: 10,
          };

          const key = props.lodLevel + "-" + props.coordX + "-" + props.coordY;

          return <GlobeTile key={key} {...props} />;
        });
      })}
    </Canvas>
  );
}
