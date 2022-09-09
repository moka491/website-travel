const fs = require('fs');
const execSync = require('child_process').execSync;

const inPath = './scripts/in/world.topo.bathy.200412.3x21600x10800.png'
const outPath = './public/assets/globe'

const LODS = [
    {
        tilesLat: 8,
        tilesLon: 10,
        tileSize: 256 
    },
    {
        tilesLat: 15,
        tilesLon: 20,
        tileSize: 256 
    },    {
        tilesLat: 45,
        tilesLon: 60,
        tileSize: 256 
    },
    
]

if (!fs.existsSync(outPath)){
    fs.mkdirSync(outPath, { recursive: true });
}

LODS.forEach((options, lod) => {
    execSync(`convert ${inPath} -crop ${options.tilesLon}x${options.tilesLat}@ +repage +adjoin -resize ${options.tileSize}x${options.tileSize} ${outPath}/tile-${lod}-%d.png`)
})