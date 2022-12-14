const fs = require("fs");
const path = require("path");
const { Exception } = require("sass");
const execSync = require("child_process").execSync;

const inputImg = "./scripts/in/world.topo.bathy.200408.3x21600x10800.png";
const tmpFolder = "./scripts/tmp";
const outFolder = "./public/assets/globe";
const extension = "webp";

const LODS = [
  {
    tilesX: 16,
    tilesY: 16,
    size: 128,
  },
  {
    tilesX: 32,
    tilesY: 32,
    size: 128,
  },
  {
    tilesX: 64,
    tilesY: 64,
    size: 128,
  },
  {
    tilesX: 128,
    tilesY: 128,
  },
];

prepareEmptyPath(outFolder);

LODS.forEach((lod, lodLevel) => {
  console.info(`LOD Level ${lodLevel}`);
  console.info("-> Clearing tmp folder");
  prepareEmptyPath(tmpFolder);

  console.info(`-> Generating ${lod.tilesX * lod.tilesY} tiles`);
  generateLodImages(lod);

  console.info("-> Mapping files to LOD coordinates");
  mapToCoordinates(lod);

  console.info("-> Moving files to assets folder");
  moveToOutPath(lodLevel);
});

function prepareEmptyPath(path) {
  if (fs.existsSync(path)) {
    fs.rmdirSync(path, { recursive: true });
  }

  fs.mkdirSync(path, { recursive: true });
}

function generateLodImages(lod) {
  const digits = String(lod.tilesX * lod.tilesY).length;
  const outImage = path.join(tmpFolder, `%0${digits}d.${extension}`);

  const resizeArg = lod.size ? `-resize '${lod.size}x${lod.size}>'` : "";

  execSync(
    `convert ${inputImg} -crop ${lod.tilesX}x${lod.tilesY}@ +repage +adjoin -quality 100 ${resizeArg} ${outImage}`
  );
}

function mapToCoordinates(lod) {
  const files = fs.readdirSync(tmpFolder);

  if (files.length !== lod.tilesX * lod.tilesY) {
    throw new Exception(
      "invalid number of generated images!" +
        `expected ${lod.tilesX * lod.tilesY}, found ${files.length}`
    );
  }

  files.forEach((file) => {
    const fileNumber = parseInt(file);
    const xCoord = fileNumber % lod.tilesX;
    const yCoord = Math.floor(fileNumber / lod.tilesX);
    const newFileName = `${xCoord},${yCoord}.${extension}`;

    fs.renameSync(
      path.join(tmpFolder, file),
      path.join(tmpFolder, newFileName)
    );
  });
}

function moveToOutPath(lodLevel) {
  fs.renameSync(tmpFolder, path.join(outFolder, String(lodLevel)));
}
