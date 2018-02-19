/**
 * Created by Nexus on 25.08.2017.
 */

var autoIncrement = 0;

var Client = function (authenticationToken) {
    this.id = autoIncrement++;
    this.authenticationToken = authenticationToken;

    this.isConnected = false;
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