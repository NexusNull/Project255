var ItemData = require("./ItemData");
/**
 * @type {{"0": {name: string, articles: string, maxHealth: number, powerPerTick: number, powerStore: number, inventorySize: number, recipes: {"0": {time: number, power: number, input: *[], output: Array}}}, "1": {name: string, articles: string, maxHealth: number, powerPerTick: number, powerStore: number, inventorySize: number, recipes: {"0": {time: number, power: number, input: *[], output: *[]}, "2": {time: number, power: number, input: *[], output: *[]}, "3": {time: number, power: number, input: *[], output: *[]}}}}}
 * @typedef BuildingData
 * @property BuildingData.Type
 * @property {} BuildingData.Properties
 */
var BuildingData = {
    Type: {
        GENERATOR: 0,
        FURNACE: 1
    },
    Properties: {
        "0": {
            "name": "generator",
            "articles": "a",
            "maxHealth": 500,
            "powerPerTick": 0,
            "maxPower": 8000,
            "inventorySize": 0,
            "recipes": {
                "0": {
                    "time": 10,
                    "power": 1000,
                    "input": [
                        {
                            "type": ItemData.Type.COAL,
                            "amount": 5
                        }
                    ],
                    "output": [
                        {
                            "type": ItemData.Type.COAL,
                            "amount": 1
                        }
                    ]
                }
            }
        },
        "1": {
            "name": "furnace",
            "articles": "a",
            "maxHealth": 500,
            "powerPerTick": -2,
            "maxPower": 8000,
            "inventorySize": 0,
            "recipes": {
                "0": {
                    "time": 10,
                    "power": -100,
                    "input": [
                        {
                            "type": ItemData.Type.IRON_ORE,
                            "amount": 2
                        }
                    ],
                    "output": [
                        {
                            "type": ItemData.Type.IRON_INGOT,
                            "amount": 1
                        }
                    ]
                },
                "2": {
                    "time": 10,
                    "power": -100,
                    "input": [
                        {
                            "type": ItemData.Type.COPPER_ORE,
                            "amount": 2
                        }
                    ],
                    "output": [
                        {
                            "type": ItemData.Type.COPPER_INGOT,
                            "amount": 1
                        }
                    ]
                },
                "3": {
                    "time": 10,
                    "power": -100,
                    "input": [
                        {
                            "type": ItemData.Type.TIN_ORE,
                            "amount": 2
                        }
                    ],
                    "output": [
                        {
                            "type": ItemData.Type.TIN_INGOT,
                            "amount": 1
                        }
                    ]
                }
            }
        }
    }
};
module.exports = BuildingData;
