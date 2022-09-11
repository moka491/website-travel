import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { GLOBE_POS as GLOBE_POSITION, GLOBE_RADIUS, LODS } from "./constants";
import {
  getCameraDistanceToTile,
  getSphericalTileCoordinates,
  renderSubdividedGlobeTiles,
} from "./utils";

type GlobeTileMaterialProps = {
  lodLevel: number;
  coordX: number;
  coordY: number;
};

function GlobeTileMaterial({
  lodLevel,
  coordX,
  coordY,
}: GlobeTileMaterialProps) {
  const [map] = useTexture([
    `/assets/globe/${lodLevel}/${coordX},${coordY}.webp`,
  ]);

  return <meshStandardMaterial map={map} />;
}

function GlobeTileFallbackMaterial() {
  return <meshStandardMaterial color={0x000} />;
}

export type GlobeTileProps = {
  lodLevel: number;
  coordX: number;
  coordY: number;
  tilesX: number;
  tilesY: number;
};

export function GlobeTile(props: GlobeTileProps) {
  const { lodLevel, coordX, coordY, tilesX, tilesY } = props;

  const sphereCoords = getSphericalTileCoordinates(
    coordX,
    coordY,
    tilesX,
    tilesY
  );
  const [subdivide, setSubdivide] = useState(false);

  useFrame((state) => {
    const cameraDistance = getCameraDistanceToTile(state.camera, sphereCoords);

    const shouldSubdivide =
      lodLevel < LODS.length - 1 &&
      cameraDistance < LODS[lodLevel + 1].distance;

    if (subdivide !== shouldSubdivide) {
      setSubdivide(shouldSubdivide);
    }
  });

  if (subdivide) {
    return (
      <group>
        {renderSubdividedGlobeTiles(
          lodLevel + 1,
          coordX,
          coordY,
          tilesX,
          tilesY
        )}
      </group>
    );
  } else {
    return (
      <mesh position={GLOBE_POSITION}>
        <sphereBufferGeometry args={[GLOBE_RADIUS, 0, 0, ...sphereCoords]} />
        <GlobeTileFallbackMaterial />
        <Suspense fallback={<GlobeTileFallbackMaterial />}>
          <GlobeTileMaterial {...props} />
        </Suspense>
      </mesh>
    );
  }
}
