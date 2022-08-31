import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const GLOBE_RADIUS = 3;

type GlobeTileProps = {
  lodLevel: number;
  latTiles: number;
  lonTiles: number;
  latIndex: number;
  lonIndex: number;
};

type GlobeTileGeometryProps = {
  latTiles: number;
  lonTiles: number;
  latIndex: number;
  lonIndex: number;
};

type GlobeTileMaterialProps = {
  lodLevel: number;
  latIndex: number;
  lonIndex: number;
};

function GlobeTileMaterial({
  lodLevel,
  latIndex,
  lonIndex,
}: GlobeTileMaterialProps) {
  const [map] = useLoader(TextureLoader, [
    `/public/assets/world-${lodLevel}-${latIndex}-${lonIndex}.png`,
  ]);

  return <meshStandardMaterial map={map} />;
}

function GlobeTileFallbackMaterial() {
  return <meshStandardMaterial color={Math.random() * 0xffffff} />;
}

function GlobeTileGeometry({
  latTiles,
  lonTiles,
  latIndex,
  lonIndex,
}: GlobeTileGeometryProps) {
  const phiLength = (2 * Math.PI) / lonTiles;
  const phiStart = (lonIndex / lonTiles) * 2 * Math.PI;
  const thetaLength = (1 * Math.PI) / latTiles;
  const thetaStart = (latIndex / latTiles) * 1 * Math.PI;

  return (
    <sphereBufferGeometry
      args={[GLOBE_RADIUS, 0, 0, phiStart, phiLength, thetaStart, thetaLength]}
    />
  );
}

export default function GlobeTile(props: GlobeTileProps) {
  return (
    <mesh>
      <GlobeTileGeometry {...props} />
      <GlobeTileFallbackMaterial />
      {/* <Suspense fallback={<GlobeTileFallbackMaterial />}>
        <GlobeTileMaterial {...props} />
      </Suspense> */}
    </mesh>
  );
}
