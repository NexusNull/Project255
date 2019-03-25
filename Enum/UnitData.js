/**
 * Created by Nexus on 13.08.2017.
 */

/**
 *
 * @type {{Type: {NONE: number, COMMANDER: number, BUILDER: number, MINER: number, POWER_DISTRIBUTOR: number}, Properties: {"1": {name: string, articles: string, maxHealth: number, powerPerTick: number, powerStore: number, jobCost: {"0": {time: number, allowed: boolean}, "1": {time: number, allowed: boolean}, "2": {time: number, allowed: boolean}, "3": {time: number, allowed: boolean}, "4": {time: number, allowed: boolean}, "5": {time: number, allowed: boolean}, "6": {time: number, allowed: boolean}, "7": {time: number, allowed: boolean}, "8": {time: number, allowed: boolean}, "9": {time: number, allowed: boolean}}}, "2": {name: string, articles: string, maxHealth: number, powerPerTick: number, powerStore: number, inventorySize: number, jobCost: {"0": {time: number, allowed: boolean}, "1": {time: number, allowed: boolean}, "2": {time: number, allowed: boolean}, "3": {time: number, allowed: boolean}, "4": {time: number, allowed: boolean}, "5": {time: number, allowed: boolean}, "6": {time: number, allowed: boolean}, "7": {time: number, allowed: boolean}, "8": {time: number, allowed: boolean}, "9": {time: number, allowed: boolean}}}, "3": {name: string, articles: string, maxHealth: number, powerPerTick: number, powerStore: number, inventorySize: number, jobCost: {"0": {time: number, allowed: boolean}, "1": {time: number, allowed: boolean}, "2": {time: number, allowed: boolean}, "3": {time: number, allowed: boolean}, "4": {time: number, allowed: boolean}, "5": {time: number, allowed: boolean}, "6": {time: number, allowed: boolean}, "7": {time: number, allowed: boolean}, "8": {time: number, allowed: boolean}, "9": {time: number, allowed: boolean}}}, "4": {name: string, articles: string, maxHealth: number, powerPerTick: number, powerStore: number, inventorySize: number, jobCost: {"0": {time: number, allowed: boolean}, "1": {time: number, allowed: boolean}, "2": {time: number, allowed: boolean}, "3": {time: number, allowed: boolean}, "4": {time: number, allowed: boolean}, "5": {time: number, allowed: boolean}, "6": {time: number, allowed: boolean}, "7": {time: number, allowed: boolean}, "8": {time: number, allowed: boolean}, "9": {time: number, allowed: boolean}}}}}}
 */
var UnitData= {
    Type: {
        COMMANDER: 0,
        BUILDER: 1,
        MINER: 2,
        POWER_DISTRIBUTOR: 3,
    },
    Properties: {
        "0": {
            "name": "commander",
            "articles": "a",
            "maxHealth": 10000,
            "powerPerTick": 100,
            "powerStore": 5000,
            "jobCost": {
                "0": { //Job None
                    "time": 0,
                    "allowed": true
                },
                "1": { //Turn
                    "time": 3,
                    "allowed": true
                },
                "2": { //Move
                    "time": 5,
                    "allowed": true
                },
                "3": { // Scan
                    "time": 15,
                    "allowed": true
                },
                "4": { //Build
                    "time": 40,
                    "allowed": true
                },
                "5": { //Craft
                    "time": 20,
                    "allowed": true
                },
                "6": { //Pick
                    "time": 3,
                    "allowed": true
                },
                "7": { //Place
                    "time": 3,
                    "allowed": true
                },
                "8": { //Attack
                    "time": 5,
                    "allowed": true
                },
                "9": { //Mine
                    "time": 10,
                    "allowed": true
                }
            }
        },
        "1": {
            "name": "builder",
            "articles": "a",
            "maxHealth": 100,
            "powerPerTick": -3,
            "powerStore": 600,
            "inventorySize": 30,
            "jobCost": {
                "0": { //Job None
                    "time": 0,
                    "allowed": true
                },
                "1": { //Turn
                    "time": 1,
                    "allowed": true
                },
                "2": { //Move
                    "time": 2,
                    "allowed": true
                },
                "3": { //Scan
                    "time": 0,
                    "allowed": false
                },
                "4": { //Build
                    "time": 25,
                    "allowed": true
                },
                "5": { //Craft
                    "time": 15,
                    "allowed": true
                },
                "6": { //Pick
                    "time": 2,
                    "allowed": true
                },
                "7": { //Place
                    "time": 2,
                    "allowed": true
                },
                "8": { //Attack
                    "time": 0,
                    "allowed": false
                },
                "9": { //Mine
                    "time": 0,
                    "allowed": false
                }
            }
        },
        "2": {
            "name": "miner",
            "articles": "a",
            "maxHealth": 200,
            "powerPerTick": -4,
            "powerStore": 1200,
            "inventorySize": 150,
            "jobCost": {
                "0": { //Job None
                    "time": 0,
                    "allowed": true
                },
                "1": { //Turn
                    "time": 1,
                    "allowed": true
                },
                "2": { //Move
                    "time": 2,
                    "allowed": true
                },
                "3": { //Scan
                    "time": 15,
                    "allowed": true
                },
                "4": { //Build
                    "time": 20,
                    "allowed": true
                },
                "5": { //Craft
                    "time": 0,
                    "allowed": false
                },
                "6": { //Pick
                    "time": 2,
                    "allowed": true
                },
                "7": { //Place
                    "time": 2,
                    "allowed": true
                },
                "8": { //Attack
                    "time": 0,
                    "allowed": false
                },
                "9": { //Mine
                    "time": 5,
                    "allowed": true
                }
            }
        },
        "3": {
            "name": "powerDistributor",
            "articles": "a",
            "maxHealth": 100,
            "powerPerTick": -4,
            "powerStore": 20000,
            "inventorySize": 0,
            "jobCost": {
                "0": { //Job None
                    "time": 0,
                    "allowed": true
                },
                "1": { //Turn
                    "time": 1,
                    "allowed": true
                },
                "2": { //Move
                    "time": 2,
                    "allowed": true
                },
                "3": { //Scan
                    "time": 15,
                    "allowed": false
                },
                "4": { //Build
                    "time": 0,
                    "allowed": false
                },
                "5": { //Craft
                    "time": 0,
                    "allowed": false
                },
                "6": { //Pick
                    "time": 0,
                    "allowed": false
                },
                "7": { //Place
                    "time": 0,
                    "allowed": false
                },
                "8": { //Attack
                    "time": 0,
                    "allowed": false
                },
                "9": { //Mine
                    "time": 0,
                    "allowed": false
                }
            }
        }
    }
};

module.exports = Object.freeze(UnitData);