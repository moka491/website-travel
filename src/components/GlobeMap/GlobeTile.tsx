import { useTexture } from "@react-three/drei";
import { Camera, useFrame } from "@react-three/fiber";
import { useState } from "react";
import { Spherical, Vector3 } from "three";
import { GLOBE_POS as GLOBE_POSITION, GLOBE_RADIUS, LODS } from "./constants";

type GlobeTileProps = {
  lodLevel: number;
  coordX: number;
  coordY: number;
  tilesX: number;
  tilesY: number;
};

type GlobeTileMaterialProps = {
  lodLevel: number;
  coordX: number;
  coordY: number;
};

type SphereTileCoordinates = [
  phiStart: number,
  phiLength: number,
  thetaStart: number,
  thetaLength: number
];

function getSphereTileCoords(
  coordX: number,
  coordY: number,
  tilesX: number,
  tilesY: number
): SphereTileCoordinates {
  const phiStart = (coordX / tilesX) * 2 * Math.PI;
  const phiLength = (2 * Math.PI) / tilesX;
  const thetaStart = (coordY / tilesY) * 1 * Math.PI;
  const thetaLength = (1 * Math.PI) / tilesY;

  return [phiStart, phiLength, thetaStart, thetaLength];
}

function getCameraDistanceToTile(
  camera: Camera,
  sphereTileCoords: SphereTileCoordinates
): number {
  const [phiStart, phiLength, thetaStart, thetaLength] = sphereTileCoords;

  const coords = new Vector3().setFromSpherical(
    new Spherical(
      GLOBE_RADIUS,
      thetaStart + thetaLength / 2,
      phiStart + phiLength / 2 - 0.5 * Math.PI
    )
  );
  return camera.position.distanceTo(coords);
}

function renderSubdividedGlobeTiles(
  newLodLevel: number,
  coordX: number,
  coordY: number,
  tilesX: number,
  tilesY: number
) {
  const lod = LODS[newLodLevel];

  return [...Array(lod.divY)].map((_, y) => {
    return [...Array(lod.divX)].map((_, x) => {
      const props: GlobeTileProps = {
        lodLevel: newLodLevel,
        coordX: coordX * lod.divX + x,
        coordY: coordY * lod.divY + y,
        tilesX: tilesX * lod.divX,
        tilesY: tilesY * lod.divY,
      };

      const key = props.lodLevel + "-" + props.coordX + "-" + props.coordY;

      return <GlobeTile key={key} {...props} />;
    });
  });
}

function GlobeTileMaterial({
  lodLevel,
  coordX,
  coordY,
}: GlobeTileMaterialProps) {
  const [map] = useTexture([
    `/public/assets/world-${lodLevel}-${coordX}-${coordY}.png`,
  ]);

  return <meshStandardMaterial map={map} />;
}

function GlobeTileFallbackMaterial() {
  return <meshStandardMaterial color={Math.random() * 0xffffff} />;
}

export default function GlobeTile(props: GlobeTileProps) {
  const { lodLevel, coordX, coordY, tilesX, tilesY } = props;

  const sphereParams = getSphereTileCoords(coordX, coordY, tilesX, tilesY);
  const [subdivide, setSubdivide] = useState(false);

  useFrame((state) => {
    const cameraDistance = getCameraDistanceToTile(state.camera, sphereParams);

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
        <sphereBufferGeometry args={[GLOBE_RADIUS, 0, 0, ...sphereParams]} />
        <GlobeTileFallbackMaterial />
        {/* <Suspense fallback={<GlobeTileFallbackMaterial />}>
            <GlobeTileMaterial {...props} />
          </Suspense> */}
      </mesh>
    );
  }
}
