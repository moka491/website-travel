import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import GlobeTile from "./GlobeTile";

type GlobeProps = {
  lodLevel: number;
  latTiles: number;
  lonTiles: number;
};

export default function Globe({ lodLevel, latTiles, lonTiles }: GlobeProps) {
  const latIndices = [...Array(latTiles)];
  const lonIndices = [...Array(latTiles)];

  const ref = useRef<Group>();
  useFrame(
    (_, delta) => (ref.current.rotation.y += (delta * (2 * Math.PI)) / 86400)
  );

  function renderTiles() {
    return latIndices.map((_, latI) => {
      return lonIndices.map((_, lonI) => {
        return (
          <GlobeTile
            latIndex={latI}
            lonIndex={lonI}
            lodLevel={lodLevel}
            latTiles={latTiles}
            lonTiles={lonTiles}
          />
        );
      });
    });
  }

  return (
    <group ref={ref} position={[0, 0, 0]}>
      {renderTiles()}
    </group>
  );
}
