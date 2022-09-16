import { Canvas, extend, Object3DNode } from "@react-three/fiber";
import { MapView } from "geo-three";
import { useState } from "react";
import { ArcgisMapsProvider } from "./ArcgisMapsProvider";
import CameraControls from "./CameraControls";
import { RaycastLOD } from "./RaycastLOD";
import THREE = require("three");

extend({ MapView });

declare module "@react-three/fiber" {
  interface ThreeElements {
    mapView: Object3DNode<MapView, typeof MapView>;
  }
}

export default function GlobeScene() {
  const [provider] = useState(new ArcgisMapsProvider());
  const [lodControl] = useState(new RaycastLOD());

  return (
    <Canvas
      onCreated={({ gl }) => {}}
      camera={{ position: [0, 0, 13000000], far: 10000000 }}
    >
      <color attach="background" args={[0, 0, 0]} />
      <CameraControls />
      <mapView lod={lodControl} args={[MapView.SPHERICAL, provider]} />
    </Canvas>
  );
}
