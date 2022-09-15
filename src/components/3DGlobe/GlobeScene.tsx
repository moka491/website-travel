import { Canvas, extend, Object3DNode } from "@react-three/fiber";
import { MapTilerProvider, MapView } from "geo-three";
import { useState } from "react";
import CameraControls from "./CameraControls";
import { RaycastLOD } from "./RaycastLOD";

extend({ MapView });

declare module "@react-three/fiber" {
  interface ThreeElements {
    mapView: Object3DNode<MapView, typeof MapView>;
  }
}

export default function GlobeScene() {
  const [provider] = useState(
    new MapTilerProvider("Py7bdlYzISBzHu48zYSC", "tiles", "satellite-v2", "jpg")
  );
  const [lodControl] = useState(new RaycastLOD());

  return (
    <Canvas camera={{ position: [0, 0, 13000000], far: 10000000 }}>
      <color attach="background" args={[0, 0, 0]} />
      <CameraControls />
      <ambientLight />

      <mapView lod={lodControl} args={[MapView.SPHERICAL, provider]} />
    </Canvas>
  );
}
