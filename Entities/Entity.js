/**
 * Created by Nexus on 13.08.2017.
 */
var Game = require("../Game");

var autoIncrement = 1;

var Entity = function (owner, health, maxHealth, power, maxPower) {
    this.id = autoIncrement++;
    this.owner = owner;

    owner.addEntity(this);

    this.health = health;
    this.maxHealth = maxHealth;

    this.power = power;
    this.maxPower = maxPower;

    //Entities don't exist in the world when they are created, they are added to a world at a later point.
    //For Future support of multiple worlds.
    this.world = null;
    this.x = null;
    this.y = null;
    this.direction = null;

    Game.addEntity(this);
};

Entity.prototype.process = function () {

};

Entity.prototype.setPosition = function (world, x, y, direction) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.direction = direction;
};

Entity.prototype.setOwner = function (owner) {
    this.owner = owner;
};

Entity.accessible = function(entity){
    return {
        ownerId: entity.owner.id,

        id: entity.id,

        health: entity.health,
        maxHealth: entity.maxHealth,
        power: entity.power,
        maxPower: entity.maxPower,

        type: "entity",
        x: entity.x,
        y: entity.y,
        worldName: (entity.world)?entity.world.name:null,
    }
};

Entity.prototype.accessible = function(){
    return Entity.accessible(this);
};

Entity.setAutoIncrement = function (number) {
    autoIncrement = number;
};

Entity.getAutoIncrement = function () {
    return autoIncrement
};



module.exports = Entity;