import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";

import { SmoothOrbitControls } from "./SmoothOrbitControls";

export default function CameraControls() {
  const camera = useThree((state) => state.camera);
  const controls = useMemo(() => new SmoothOrbitControls(camera), [camera]);
  const gl = useThree((state) => state.gl);
  const domElement = gl.domElement as HTMLElement;

  useFrame(() => {
    controls.update();
  }, -1);

  useEffect(() => {
    controls.connect(domElement);
    return () => void controls.dispose();
  }, [domElement, controls]);

  return (
    <>
      {/* @ts-ignore */}
      <primitive
        object={controls}
        minDistance={6378137}
        maxDistance={13000000}
        enablePan={false}
        rotateSpeed={0.2}
      />
    </>
  );
}
