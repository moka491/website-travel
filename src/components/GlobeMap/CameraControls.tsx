import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three-stdlib/controls/OrbitControls";

extend({ OrbitControls });

export default function CameraControls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controls = useRef<OrbitControls>();
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
