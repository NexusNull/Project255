/**
 * Created by Nexus on 14.08.2017.
 */
const Entity = require("./Entity");
const BuildingData = require("../Enum/BuildingData");
/**
 * @class Building
 * @extends Entity
 * @property Building.buildingType
 * @property Building.inputTile
 * @property Building.outputTile
 * @property Building.recipe
 * @property Building.time
 * @property Building.isCrafting
 */

/**
 *
 * @param {Client} owner
 * @param {number} buildingType
 * @constructor
 */
var Building = function (owner, buildingType) {
    Entity.apply(this, [
        owner,
        BuildingData.Properties[buildingType].maxHealth,
        BuildingData.Properties[buildingType].maxPower
    ]);

    /**
     * @name Building#buildingType
     * @type {number}
     */
    this.buildingType = buildingType;
    /**
     * @name Building#inputTile
     * @type {Tile|null}
     * @default null
     */
    this.inputTile = null;
    /**
     * @name Building#outputTile
     * @type {null}
     * @default null
     */
    this.outputTile = null;

    /**
     * @name Building#recipe
     * @type {null|number}
     * @default null
     */
    this.recipe = 0;

    /**
     * Indicates the stage the crafting recipe is in, basically the time left until it is finished.
     * @name Building#time
     * @type {number}
     * @default 0
     */
    this.time = 0;

    /**
     * @name Building#isCrafting
     * @type {boolean}
     * @default false
     */
    this.isCrafting = false;
};

for(let key in Entity.prototype){
    Building.prototype[key] = Entity.prototype[key];
}

Building.prototype.setPosition = function (world, x, y, direction) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.direction = direction;

    switch (this.direction) {
        case 0:
            this.outputTile = this.world.getTileAt(x + 1, y);
            this.inputTile = this.world.getTileAt(x - 1, y);
            break;
        case 1:
            this.outputTile = this.world.getTileAt(x, y + 1);
            this.inputTile = this.world.getTileAt(x, y - 1);
            break;
        case 2:
            this.outputTile = this.world.getTileAt(x - 1, y);
            this.inputTile = this.world.getTileAt(x + 1, y);
            break;
        default:
            this.outputTile = this.world.getTileAt(x, y - 1);
            this.inputTile = this.world.getTileAt(x, y + 1);
            break;
    }
};
/**
 * @this Building
 */
Building.prototype.process = function () {
    if (this.recipe != null) {
        let recipe = BuildingData.Properties[this.buildingType].recipes[this.recipe];
        let input = recipe.input;
        let output = recipe.output;
        let supplies = this.inputTile.content;

        if (this.isCrafting) {
            if (this.time < 1) {
                //Done Crafting produce output
                this.power += recipe.power;
                for(let i=0;i< output.length;i++){
                    this.outputTile.addItem(output[i].type, output[i].amount);
                }
                this.isCrafting = false;
            } else {
                this.time--;
            }
        }
        if (!this.isCrafting) {
            if (recipe.power > 0 && (this.maxPower - this.power) < recipe.power) {
                return;
            }

            let enoughSupplies = true;
            for (let i = 0; i < input.length; i++) {
                let item = this.inputTile.findItem(input[i].type);
                if (!(item && item.amount >= input[i].amount)) {
                    enoughSupplies = false;
                }
            }
            if (enoughSupplies) {
                this.isCrafting = true;
                this.time = recipe.time;
                for (let i = 0; i < input.length; i++) {
                    this.inputTile.removeItem(input[i].type, input[i].amount);
                }
            }
        }
    }
};

/**
 *
 * @param {Building} building
 * @returns {{ownerId, id, health, maxHealth, power, maxPower, type, x, y, direction, worldName}}
 */
Building.accessible = function (building) {
    let data = Entity.accessible(building);

    data.type = "building";
    data.outputTile = (building.outputTile) ? building.outputTile.accessible() : null;
    data.inputTile = (building.inputTile) ? building.inputTile.accessible() : null;
    data.buildingType = building.buildingType;
    data.isCrafting = building.isCrafting;

    return data;
};

Building.prototype.accessible = function () {
    return Building.accessible(this);
};

module.exports = Building;