/**
 * Created by Nexus on 13.08.2017.
 */
let World = require("./World");

/**
 * Loads and saves worlds
 * will use compression to store worlds
 * @constructor
 */
let WorldStore = function () {


};

WorldStore.prototype.getAvailableWorlds = function () {
    let worlds = [];

    return worlds;
};

WorldStore.prototype.loadWorld = function (name) {
    let world = new World(name);


    return world;
};


WorldStore.prototype.saveWorld = function (world) {


};

WorldStore.prototype.createWorld = function (name) {
    let world = new World(name);


    return world;
};


module.exports = new WorldStore();

