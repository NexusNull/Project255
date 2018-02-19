/**
 * Created by Nexus on 13.08.2017.
 */

var Game = require("./Game");
var WorldStore = require("./World/WorldStore");
var EntityFactory = require("./Entities/EntityFactory")

var worlds = WorldStore.getAvailableWorlds();

if (worlds.length > 0) {
    worlds[0] = WorldStore.loadWorld(worlds[0].name);
} else {
    worlds[0] = WorldStore.createWorld("World");
}
Game.addWorld(worlds[0].name, worlds[0]);
var client = Game.createClient("random");

for (var i = 0; i < 5; i++) {
    var entity = EntityFactory.createCommander(client, 100, 100);
    worlds[0].addEntity(entity, i + 50, 50, 0);
}
Game.processing();


