/**
 * Created by Nexus on 13.08.2017.
 */

var game = require("./Game");
var ItemData = require("./Enum/ItemData");
global.game = game;

var WorldStore = require("./World/WorldStore");
var EntityFactory = require("./Entities/EntityFactory");

var worlds = WorldStore.getAvailableWorlds();

if (worlds.length > 0) {
    worlds[0] = WorldStore.loadWorld(worlds[0].name);
} else {
    worlds[0] = WorldStore.createWorld("World");
}

game.addWorld(worlds[0].name, worlds[0]);
var client = game.createClient("random");


var commander = EntityFactory.createCommander(client);
var generator = EntityFactory.createGenerator(client);
var furnace = EntityFactory.createFurnace(client);
worlds[0].addEntity(commander, 20, 20, 0);
game.processing();


