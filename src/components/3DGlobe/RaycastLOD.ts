import { LODControl, MapView } from "geo-three";
import { Camera, Object3D, Raycaster, Vector2, WebGLRenderer } from "three";

export class RaycastLOD implements LODControl {
  /**
   * Number of rays used to test nodes and subdivide the map.
   *
   * N rays are cast each frame dependeing on this value to check distance to the visible map nodes. A single ray should be enough for must scenarios.
   */
  public subdivisionRays: number = 1;

  public distanceSubdivide: number = 12;
  public distanceSimplify: number = 60;

  public raycaster: Raycaster = new Raycaster();

  public mouse: Vector2 = new Vector2();

  public updateLOD(
    view: MapView,
    camera: Camera,
    renderer: WebGLRenderer,
    scene: Object3D
  ): void {
    const intersects = [];

    for (let t = 0; t < this.subdivisionRays; t++) {
      // Raycast from random point
      this.mouse.set(Math.random() * 2 - 1, Math.random() * 2 - 1);

      // Check intersection
      this.raycaster.setFromCamera(this.mouse, camera);
      this.raycaster.intersectObjects(view.children, true, intersects);
    }

    for (let i = 0; i < intersects.length; i++) {
      const node = intersects[i].object;
      let distance = intersects[i].distance;

      distance /= Math.pow(2, view.provider.maxZoom - node.level);

      console.log(node.level, distance);

      if (distance < this.distanceSubdivide) {
        node.subdivide();
        return;
      } else if (distance > this.distanceSimplify) {
        if (node.parentNode !== null) {
          node.parentNode.simplify();
          return;
        }
      }
    }
  }
}
