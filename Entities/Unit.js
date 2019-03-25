/**
 * Created by Nexus on 14.08.2017.
 */
const JobData = require("../Enum/JobData");
const Job = require("../Jobs/Job");
const Entity = require("./Entity");
const TileData = require("../Enum/TileData");
const UnitData = require("../Enum/UnitData");
/**
 * Creates a unit
 * @param owner
 * @param {number} unitType
 * @constructor Unit
 */
var Unit = function (owner, unitType) {

    Entity.apply(this, [
        owner,
        UnitData.Properties[unitType].maxHealth,
        UnitData.Properties[unitType].maxPower]
    );

    /**
     * @typedef {Array<Job>} jobQueue
     */
    this.jobQueue = [{type:JobData.Type.NONE,time:0}];
    this.jobLog = [];
    this.direction = 0;
    this.unitType = unitType;
};
for(let key in Entity.prototype){
    Unit.prototype[key] = Entity.prototype[key];
}


Unit.prototype.doJob = function (job) {
    switch (job.type) {
        case JobData.Type.ATTACK:

            break;
        case JobData.Type.BUILD:

            break;
        case JobData.Type.CRAFT:

            break;
        case JobData.Type.MOVE:
            let currentTile = this.world.getTileAt(this.x, this.y);
            let targetTile = this.getTargetTile();
            if (targetTile)
                if (targetTile.occupant === null && targetTile.type === TileData.Type.LOW_GROUND) {
                    let targetPos = this.getTargetPosition();
                    this.x = targetPos.x;
                    this.y = targetPos.y;
                    targetTile.occupant = this;
                    currentTile.occupant = null;
                }else {
                    console.log("Can not move there.")
                }
            break;
        case JobData.Type.PICK:

            break;
        case JobData.Type.PLACE:

            break;
        case JobData.Type.SCAN:

            break;
        case JobData.Type.TURN:
            console.log(job);
            if(job.options) {
                let direction = job.options.direction;
                if (direction >= 0 && direction <= 3) {
                    this.direction = direction;
                }
            }
            break;
        case JobData.Type.MINE:

            break;
        default:

            break;
    }
};
/**
 * @param {Job} job
 */
Unit.prototype.queueJob = function(job){
    var jobProps = UnitData.Properties[this.unitType].jobCost[job.type];
    if(jobProps.allowed){
        job.time = jobProps.time;
        this.jobQueue.push(job);
    } else{
        //TODO return error
    }
};

Unit.prototype.getTargetPosition = function(){
    let targetPos;
    switch (this.direction) {
        case 0:
            targetPos = {x: this.x + 1, y: this.y};
            break;
        case 1:
            targetPos = {x: this.x, y: this.y + 1};
            break;
        case 2:
            targetPos = {x: this.x - 1, y: this.y};
            break;
        default:
            targetPos = {x: this.x, y: this.y - 1};
            break;
    }
    return targetPos;
};

Unit.prototype.getTargetTile = function(){
    let targetPos = this.getTargetPosition();
    return this.world.getTileAt(targetPos.x, targetPos.y);
};


Unit.prototype.stopJob = function () {


};

Unit.prototype.process = function () {
    //Job logic
    if(this.jobQueue.length > 0){
        let job = this.jobQueue[0];
        if(job.time === 0){
            this.jobQueue.shift();
            this.doJob(job);
            this.jobLog.push(job)
        } else {
            job.time--;
        }
    }
};

Unit.accessible = function (unit) {
    let data = Entity.accessible(unit);
    data.type = "unit";
    data.unitType = this.unitType;
    data.jobQueue = unit.jobQueue;
    return data;
};

Unit.prototype.accessible = function () {
    return Unit.accessible(this);
};
module.exports = Unit;