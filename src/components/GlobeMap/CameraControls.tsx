import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Camera } from "@react-three/fiber";
import { useRef } from "react";
import { GLOBE_RADIUS } from "./constants";

export default function CameraControls() {
  const virtualCamera = useRef<Camera>();

  return (
    <>
      <PerspectiveCamera ref={virtualCamera} position={[0, 20, 100]} />
      <OrbitControls
        camera={virtualCamera.current}
        minDistance={GLOBE_RADIUS + 2}
        enablePan={false}
        enableDamping={true}
        rotateSpeed={0.2}
      />
    </>
  );
}
