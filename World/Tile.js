/**
 * Created by Nexus on 13.08.2017.
 */
var Resource = require("../Enum/ResourceData");
var TileEnum = require("../Enum/TileData");

/**
 *
 * @param chunk
 * @param pos
 * @param type
 * @param resourceType
 * @param resourceAmount
 * @param content
 * @property {Array<ItemStack>} content
 * @constructor
 */
var Tile = function (chunk, pos, type, resourceType, resourceAmount, content) {
    this.chunk = chunk;
    this.id = pos;
    this.type = (type) ? type : TileEnum.Type.LOW_GROUND;
    this.resourceType = (resourceType && resourceAmount) ? resourceType : Resource.Type.NONE;
    this.resourceAmount = (resourceType && resourceAmount) ? resourceAmount : 0;
    this.content = (content) ? content : [];
    this.occupant = null;
};

/**
 *
 * @param {number}type
 * @return {ItemStack|null} The item object that was found
 */
Tile.prototype.findItem = function (type) {
    for (let i = 0; i < this.content.length; i++) {
        if (this.content[i].type === type) {
            return this.content[i];
        }
    }
    return null;
};

/**
 *
 * @param {number} type
 * @param {number} amount
 */
Tile.prototype.removeItem = function (type, amount) {
    this.chunk.registerChange(this);
    if (amount == null) {
        amount = 1;
    }
    for (let i = 0; i < this.content.length; i++) {
        if (this.content[i].type === type) {
            if (this.content[i].amount - amount < 0) {
                return false;
            } else if (this.content[i].amount - amount === 0) {
                this.content[i].splice(j, 1);
            } else {
                this.content[i].amount -= amount;
            }
        }
    }
};

/**
 *
 * @param {number} type
 * @param {number} amount
 */
Tile.prototype.addItem = function (type, amount) {
    this.chunk.registerChange(this);
    if (amount == null) {
        amount = 1;
    }
    for (let i = 0; i < this.content.length; i++) {
        if (this.content[i].type === type) {
            this.content[i].amount += amount;
            return;
        }
    }
    this.content.push({
        type: type,
        amount: amount,
    });
};

/**
 * Thanks to Deeredman1991
 * @returns {{type: *, resourceType: *, resourceAmount: *, content: *}}
 */
Tile.prototype.accessible = function () {
    return {
        id: this.id,
        type: this.type,
        resourceType: this.resourceType,
        resourceAmount: this.resourceAmount,
        content: this.content,
    }
};

module.exports = Tile;