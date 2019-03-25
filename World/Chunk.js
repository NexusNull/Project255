/**
 * Created by Nexus on 13.08.2017.
 */
var SimplexNoise = require("simplex-noise");
var Alea = require("alea");
var random = new Alea(202);
var simplex = new SimplexNoise(random);
var Tile = require("./Tile");

/**
 * A Chunk is a part of the Map that is 32*32
 * @constructor
 */
var TileType = require("../Enum/TileData");

var Chunk = function (world, x, y) {
    this.world = world;
    this.tiles = [];
    this.x = x;
    this.y = y;
    this.changeList = new Set();

    for (let i = 0; i < 32; i++) {
        for (let j = 0; j < 32; j++) {
            let f = 2;
            let value = (simplex.noise2D((i + x * 32) / 70, (j + y * 32) / 60) + 1) * 0.75;
            value += (simplex.noise2D((i + x * 32) / (10 * f), (j + y * 32) / (10 * f)) + 1) * 0.25;
            value *= 125;

            let iron = (simplex.noise2D(1000 + (i + x * 32) / 80, -0.3 + (j + y * 32) / 60) + 1);
            let copper = (simplex.noise2D((i + x * 32) / 50, (j + y * 32) / 40) + 1);
            let coal = (simplex.noise2D((i + x * 32) / 50, (j + y * 32) / 40) + 1);
            let pos = i + 32 * j;

            if (value < 40) {
                this.tiles[i + 32 * j] = new Tile(this, pos, TileType.Type.WATER);
            } else if (value > 180) {
                this.tiles[i + 32 * j] = new Tile(this, pos, TileType.Type.HIGH_GROUND);
            } else {
                let tile;
                if (iron > 1.8) {
                    tile = new Tile(this, pos, TileType.Type.LOW_GROUND, 1, Math.floor((iron - 1.8) * 10000));
                } else {
                    tile = new Tile(this, pos, TileType.Type.LOW_GROUND);
                }
                this.tiles[pos] = tile;
            }
        }
    }
};

Chunk.prototype.registerChange = function(tile){
    if(tile.chunk === this){
        this.world.registerChange(this);
        this.changeList.add(tile);
    }
};

Chunk.prototype.getChanges = function(){
    return this.changeList.values();
};

Chunk.prototype.clearChangeList = function(){
    this.changeList.clear();
};

Chunk.prototype.getTileAt = function (x, y) {
    return this.tiles[y * 32 + x];
};

Chunk.prototype.accessible = function () {
    let tiles = [];

    for (let i = 0; i < this.tiles.length; i++) {
        tiles[i] = this.tiles[i].accessible();
    }

    return {
        x: this.x,
        y: this.y,
        tiles: tiles,
    }
};

module.exports = Chunk;