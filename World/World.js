/**
 * Created by Nexus on 13.08.2017.
 */
var Chunk = require("./Chunk");
var ResourceEnum = require("./ResourceEnum");
var BotWebInterface = require("bot-web-interface");
BotWebInterface.startOnPort(1002);
var publisher = BotWebInterface.SocketServer.getPublisher();


publisher.setStructure([
    {name: "name", type: "text", label: "WorldName"},
    {name: "tick", type: "text", label: "Tick"},
    {name: "image", type: "image", label: "", options: {width: 800, height: 800}}
]);

var World = function (name) {
    var self = this;
    this.tick = 0;
    this.chunks = {};
    this.entities = {};
    this.dataExchanger = publisher.createInterface();
    this.name = name;
    this.dataExchanger.setDataSource(function () {
        return {
            name: "World1",
            tick: self.tick,
        }
    });


    var size = 12;
    for (var i = 0; i < size * size; i++) {
        this.generateChunk(i % size, Math.floor(i / size));

    }
};

World.prototype.generateChunk = function (x, y) {
    console.log("generate Chunk: " + x + " " + y);
    this.chunks[x + " " + y] = new Chunk(x, y);
};

var k = 0;
World.prototype.doTick = function () {
    this.tick++;
    var self = this;
    for (var id in this.entities) {
        var entity = this.entities[id];
        if (entity) {
            entity.process();
        }
    }


    let height = 400;
    let width = 400;
    var PNGImage = require('pngjs-image');
    var image = PNGImage.createImage(width, height);
    image.fillRect(0, 0, image.getWidth(), image.getHeight(), {red: 255, green: 255, blue: 255, alpha: 255});
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let tile = this.getTileAt(x, y);
            if (tile) {
                if (tile.type === 2) {
                    image.setAt(x, y, {red: 0, green: 0, blue: 255, alpha: 255});
                } else if (tile.type === 1) {
                    image.setAt(x, y, {red: 200, green: 200, blue: 200, alpha: 255});
                } else {
                    image.setAt(x, y, {red: 0, green: 210, blue: 0, alpha: 255});
                }
                if (tile.resourceType === ResourceEnum.Type.IRON) {
                    image.setAt(x, y, {red: 0, green: 180, blue: 255, alpha: 125})
                }
            }

        }
    }
    for (let id in this.entities) {
        if (!this.entities.world)
            image.setPixel(this.entities[id].x, this.entities[id].y, {red: 255, green: 0, blue: 0, alpha: 255});
    }


    k++;
    var pngjs = image.getImage();
    pngjs.pack();
    var chunks = [];
    pngjs.on('data', function (chunk) {
        chunks.push(chunk);
    });
    pngjs.on('end', function () {
        var result = Buffer.concat(chunks);
        self.dataExchanger.pushData("image", "data:image/png;base64," + result.toString('base64'));
    });

};

World.prototype.accessible = function () {
    let chunks = {};

    for (let id in this.chunks) {
        chunks[id] = this.chunks[id].accessible();
    }
    return {
        chunks: chunks,
        tick: this.tick,
        name: this.name,
    };
};

/**
 *
 * @param entity {Entity}
 * @param x {number}
 * @param y {number}
 * @param direction {number}
 */
World.prototype.addEntity = function (entity, x, y, direction) {
    if (!entity)
        return false;
    let tile = this.getTileAt(x, y);
    entity.setPosition(this, x, y, direction);
    tile.occupant = entity;
    this.entities[entity.id] = entity;
};

/**
 * Removes entity out of the world but the entity will still continue to exist
 * @param entity {Entity} the entity
 */
World.prototype.removeEntity = function (entity) {
    let tile = this.getTileAt(entity.x, entity.y);
    entity.setPosition(null, null, null, null);
    tile.occupant = null;
    delete this.entities[entity.id];
};

World.prototype.getTileAt = function (x, y) {
    var chunk = this.chunks[Math.floor(x / 32) + " " + Math.floor(y / 32)];
    if (chunk) {
        return chunk.getTileAt(x % 32, y % 32);
    }
};


module.exports = World;