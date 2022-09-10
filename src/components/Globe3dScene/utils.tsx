import { Camera, Spherical, Vector3 } from "three";
import { GLOBE_RADIUS, LODS } from "./constants";
import { GlobeTile, GlobeTileProps } from "./GlobeTile";

type SphericalTileCoords = [
  phiStart: number,
  phiLength: number,
  thetaStart: number,
  thetaLength: number
];

export function getSphericalTileCoordinates(
  coordX: number,
  coordY: number,
  tilesX: number,
  tilesY: number
): SphericalTileCoords {
  const phiStart = (coordX / tilesX) * 2 * Math.PI;
  const phiLength = (2 * Math.PI) / tilesX;
  const thetaStart = (coordY / tilesY) * 1 * Math.PI;
  const thetaLength = (1 * Math.PI) / tilesY;

  return [phiStart, phiLength, thetaStart, thetaLength];
}

export function getCameraDistanceToTile(
  camera: Camera,
  tileCoords: SphericalTileCoords
): number {
  const [phiStart, phiLength, thetaStart, thetaLength] = tileCoords;

  const coords = new Vector3().setFromSpherical(
    new Spherical(
      GLOBE_RADIUS,
      thetaStart + thetaLength / 2,
      phiStart + phiLength / 2 - 0.5 * Math.PI
    )
  );
  return camera.position.distanceTo(coords);
}

export function renderSubdividedGlobeTiles(
  lodLevel: number,
  parentCoordX: number,
  parentCoordY: number,
  parentTilesX: number,
  parentTilesY: number
) {
  const lod = LODS[lodLevel];

  return [...Array(lod.divY)].map((_, y) => {
    return [...Array(lod.divX)].map((_, x) => {
      const props: GlobeTileProps = {
        lodLevel,
        coordX: parentCoordX * lod.divX + x,
        coordY: parentCoordY * lod.divY + y,
        tilesX: parentTilesX * lod.divX,
        tilesY: parentTilesY * lod.divY,
      };

      const key = props.lodLevel + "-" + props.coordX + "-" + props.coordY;

      return <GlobeTile {...props} key={key} />;
    });
  });
}
