/**
 * Created by Nexus on 27.08.2017.
 */

var Server = require("./Network/Server");
var Client = require("./Network/Client");

/**
 * @property {object} worlds
 * @property {Array<Entity>} entities
 * @property {Array<Client>} clients
 * @property {Server} server
 * @property {number} tickSpeed - default 100
 * @property {number} adjustedTickSpeed
 * @property {boolean} adjustingTickSpeed - default true
 * @constructor Game
 */

var Game = function () {
    this.worlds = {};
    this.entities = [];
    this.clients = [];
    this.server = new Server(this);
    this.tickSpeed = 0;
    this.adjustedTickSpeed = this.tickSpeed;
    this.adjustingTickSpeed = true;

    this.server.openSocket();
};


Game.prototype.createClient = function (authenticationToken) {
    var client = new Client(authenticationToken);
    this.clients[client.id] = client;
    return client;
};

Game.prototype.addWorld = function(worldName, world){
    this.worlds[worldName] = world;
};

/**
 *
 * @param entity {Entity}
 */
Game.prototype.addEntity = function (entity) {
    this.entities[entity.id] = entity;
};

/**
 * Removes the entity from the game should not be referenced after removing.
 * @param entity {Entity}
 */
Game.prototype.removeEntity = function (entity) {
    let world = entity.world;
    if (world) {
        world.removeEntity(entity);
    }
    if (entity.owner) {
        let owner = entity.owner;
        delete owner.entities[entity.id];
    }
    delete this.entities[entity.id];
};

Game.prototype.setTickSpeed = function (tickSpeed) {
    this.tickSpeed = tickSpeed;
    this.adjustedTickSpeed = tickSpeed;
};

Game.prototype.processing = function () {
    var tickSpeed = this.tickSpeed;
    if(this.adjustingTickSpeed){
        tickSpeed = this.adjustedTickSpeed;
    }
    setTimeout(this.processing.bind(this), tickSpeed);

    let start = Date.now();
    for (let worldName in this.worlds) {
        this.worlds[worldName].doTick();
    }

    this.server.sendGameStateUpdates();

    for (let worldName in this.worlds) {
        this.worlds[worldName].clearChangeList();
    }
    let end = Date.now();

    //TODO improve later: Recession of lag
    if (end - start > tickSpeed){
        console.log("Can not keep up.");
        if(this.adjustingTickSpeed){
            this.adjustedTickSpeed += 50;
        }
    }
};

module.exports = new Game();