import { renderSubdividedGlobeTiles } from "./utils";

export function Globe() {
  return <>{renderSubdividedGlobeTiles(0, 0, 0, 1, 1)}</>;
}
