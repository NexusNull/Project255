/**
 * Created by Nexus on 25.08.2017.
 */

var autoIncrement = 0;
/**
 * This object behaves as a storage object for general client data. That means data that is available while the client is offline.
 * Data related to an active client should be stored in active client.
 * @param authenticationToken
 * @property {object} Client.entities - owned entities
 * @property {string} Client.authenticationToken
 * @property {number} Client.id - Ids start from 0
 * @constructor Client
 */
var Client = function (authenticationToken) {
    this.id = autoIncrement++;
    this.authenticationToken = authenticationToken;

    this.entities = {};
};

Client.prototype.addEntity = function (entity) {
    this.entities[entity.id] = entity;
};

Client.prototype.removeEntity = function (entity) {
    delete this.entities[entity.id];
};

Client.setAutoIncrement = function (number) {
    autoIncrement = number;
};

Client.getAutoIncrement = function () {
    return autoIncrement;
};

Client.prototype.accessible = function(){
    return {
        id:this.id,
    }
};

module.exports = Client;