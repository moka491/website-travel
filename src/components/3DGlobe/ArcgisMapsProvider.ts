import { MapProvider } from "geo-three";

export class ArcgisMapsProvider extends MapProvider {
  fetchTile(zoom, x, y) {
    return new Promise((resolve, reject) => {
      var image = document.createElement("img");
      image.onload = function () {
        resolve(image);
      };
      image.onerror = function () {
        reject();
      };
      image.crossOrigin = "Anonymous";
      image.src =
        "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/" +
        zoom +
        "/" +
        y +
        "/" +
        x +
        ".jpeg";
    });
  }
}
