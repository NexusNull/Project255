/**
 * Created by Nexus on 15.08.2017.
 */
var JobData = require("../Enum/JobData");
var Job = require("./Job");

var JobFactory = function(){

};

JobFactory.prototype.createNoneJob = function(){
    return new Job(JobData.Type.NONE,0,);
};