/**
 * Created by Nexus on 13.08.2017.
 */
var JobEnum = require("../Jobs/JobEnum");
var Job = require("../Jobs/Job");
var Unit = require("../Entities/Unit");
console.log(require.resolve("../Game"));
var EntityFactory = function(){

};

EntityFactory.prototype.createCommander = function(owner, health, power){
    return new Unit(owner, health, 100, power, 100, [JobEnum.Type.MOVE], new Job(JobEnum.Type.NONE, 0, {}), null)
};

module.exports = new EntityFactory();