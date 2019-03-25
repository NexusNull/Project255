/**
 * Created by Nexus on 13.08.2017.
 */
var Chunk = require("./Chunk");
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
    this.changeList = new Set();
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
    this.chunks[x + " " + y] = new Chunk(this, x, y);
};


World.prototype.doTick = function () {
    this.tick++;
    var self = this;
    for (var id in this.entities) {
        var entity = this.entities[id];
        if (entity) {
            entity.process();
        }
    }
};

World.prototype.accessible = function () {
    let chunks = {};
    let entities = [];

    for (let id in this.chunks) {
        chunks[id] = this.chunks[id].accessible();
    }
    for(let id in this.entities){
        entities.push(this.entities[id].accessible());
    }
    return {
        chunks: chunks,
        entities: entities,
        tick: this.tick,
        name: this.name,
    };
};

World.prototype.registerChange = function(chunk){
    if(chunk.world === this){
        this.changeList.add(chunk);
    }
};

World.prototype.getChanges = function(){
    return this.changeList.values();
};

World.prototype.clearChangeList = function(){
    this.changeList.clear();
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
    entity.setPosition(this, x, y, direction);
    this.entities[entity.id] = entity;
    return true;
};

/**
 * Removes entity out of the world but the entity will still continue to exist
 * Call game.removeEntity to remove it completely
 * @param entity {Entity} the entity
 */
World.prototype.removeEntity = function (entity) {
    entity.setPosition(null, null, null, null);
    delete this.entities[entity.id];
};

World.prototype.getTileAt = function (x, y) {
    var chunk = this.chunks[Math.floor(x / 32) + " " + Math.floor(y / 32)];
    if (chunk) {
        return chunk.getTileAt(x % 32, y % 32);
    }
};


module.exports = World;