import { extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { OrbitControls } from "three-stdlib/controls/OrbitControls";

extend({ OrbitControls });

export default function CameraControls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controls = useRef<OrbitControls>();

  useEffect(() => {
    // Initial position
    camera.position.set(0, 20, 100);
    controls.current.update();
  }, []);

  useFrame(() => controls.current.update());
  return (
    // @ts-ignore
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enablePan={false}
      enableDamping={true}
      rotateSpeed={0.2}
    />
  );
}
