import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { TextureLoader } from "three";
import { OrbitControls } from "three-stdlib/controls/OrbitControls";

extend({ OrbitControls });

function CameraControls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enablePan={false}
      enableDamping={true}
      rotateSpeed={0.2}
    />
  );
}

function GlobeMaterial(props) {
  const [map] = useLoader(TextureLoader, ["/public/assets/world.png"]);
  return <meshStandardMaterial map={map} {...props} />;
}

function FallbackMaterial(props) {
  return <meshStandardMaterial color={"#000033"} />;
}

function GlobeModel(props) {
  const ref = useRef();
  useFrame(
    (_, delta) => (ref.current.rotation.y += (delta * (2 * Math.PI)) / 86400)
  );

  return (
    <mesh {...props} ref={ref}>
      <sphereBufferGeometry args={[3, 80, 80]} />
      <Suspense fallback={<FallbackMaterial />}>
        <GlobeMaterial />
      </Suspense>
    </mesh>
  );
}

const GlobeScene = () => {
  return (
    <Canvas>
      <CameraControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <GlobeModel position={[0, 0, 0]} />
    </Canvas>
  );
};

export default GlobeScene;
