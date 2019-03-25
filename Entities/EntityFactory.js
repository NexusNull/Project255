/**
 * Created by Nexus on 13.08.2017.
 */
const JobEnum = require("../Enum/JobData");
const UnitData = require("../Enum/UnitData");
const BuildingData = require("../Enum/BuildingData");
var Building = require("../Entities/Building");
var Unit = require("../Entities/Unit");
var EntityFactory = function(){

};

EntityFactory.prototype.createCommander = function(owner){
    return new Unit(owner,UnitData.Type.COMMANDER);
};

EntityFactory.prototype.createGenerator = function(owner){
    return new Building(owner, BuildingData.Type.GENERATOR);
};

EntityFactory.prototype.createFurnace = function(owner){
    return new Building(owner, BuildingData.Type.FURNACE);
};

module.exports = new EntityFactory();