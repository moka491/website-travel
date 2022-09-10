import { OrbitControls } from "@react-three/drei";
import { GLOBE_RADIUS } from "./constants";

export default function CameraControls() {
  return (
    <>
      <OrbitControls
        minDistance={GLOBE_RADIUS + 2}
        maxDistance={GLOBE_RADIUS * 2}
        enablePan={false}
        enableDamping={true}
        rotateSpeed={0.2}
      />
    </>
  );
}
