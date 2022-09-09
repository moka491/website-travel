import { Vector3 } from "@react-three/fiber";

export type Lod = {
  divX: number;
  divY: number;
  distance: number;
};

export const LODS: Lod[] = [
  {
    divX: 2,
    divY: 2,
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
    distance: 20,
  },
];

export const GLOBE_RADIUS = 50;
export const GLOBE_POS: Vector3 = [0, 0, 0];
