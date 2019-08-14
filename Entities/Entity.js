/**
 * Created by Nexus on 13.08.2017.
 */

var autoIncrement = 0;
/**
 *
 * @param owner {Client}
 * @param maxHealth {number}
 * @param maxPower {number}
 * @constructor
 */
var Entity = function (owner, maxHealth, maxPower) {
    if(!owner){
        throw "Can't create an entity without an owner";
    }

    this.id = autoIncrement++;
    this.owner = owner;

    owner.addEntity(this);

    this.health = maxHealth;
    this.maxHealth = maxHealth;

    this.power = 0;
    this.maxPower = maxPower;

    //Entities don't exist in the world when they are created, they are added to a world at a later point.
    //For Future support of multiple worlds.
    this.world = null;
    this.x = null;
    this.y = null;
    this.direction = null;

    game.addEntity(this);
};

Entity.prototype.process = function () {

};

Entity.prototype.setPosition = function (world, x, y, direction) {
    if (this.world && this.x && this.y) {
        let tile = this.world.getTileAt(this.x, this.y);
        if (tile) {
            this.occupant = null;
        }
    }
    if (world) {
        let tile = world.getTileAt(x, y);
        tile.occupant = this;
    }

    this.world = world;
    this.x = x;
    this.y = y;
    this.direction = direction;
};

Entity.prototype.setOwner = function (owner) {
    this.owner = owner;
};

Entity.accessible = function (entity) {
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
        direction: entity.direction,
        worldName: (entity.world) ? entity.world.name : null,
    }
};

Entity.prototype.accessible = function () {
    return Entity.accessible(this);
};

Entity.setAutoIncrement = function (number) {
    autoIncrement = number;
};

Entity.getAutoIncrement = function () {
    return autoIncrement
};


module.exports = Entity;