import { Vector3 } from "@react-three/fiber";

export type LOD = {
  divX: number;
  divY: number;
  distance: number;
};

export const LODS: LOD[] = [
  {
    divX: 16,
    divY: 16,
    distance: 40,
  },
  {
    divX: 2,
    divY: 2,
    distance: 30,
  },
  {
    divX: 2,
    divY: 2,
    distance: 10,
  },
  {
    divX: 2,
    divY: 2,
    distance: 5,
  },
];

export const GLOBE_RADIUS = 50;
export const GLOBE_POS: Vector3 = [0, 0, 0];
