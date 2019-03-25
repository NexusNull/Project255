/**
 * @typedef {object} ItemStack
 * @typedef {number} ItemStack.amount
 * @typedef {number} ItemStack.type
 * @type {{Type: {NONE: number, COAL: number, IRON_ORE: number, COPPER_ORE: number, TIN_ORE: number, IRON_INGOT: number, COPPER_INGOT: number, TIN_INGOT: number, IRON_PLATE: number, COPPER_PLATE: number, TIN_PLATE: number}, Name: {"0": string, "1": string, "2": string, "3": string, "4": string, "5": string, "6": string, "7": string, "8": string, "9": string, "10": string}}}
 */

var ItemData = {
    Type: {
        NONE: 0,
        COAL: 1,
        IRON_ORE: 2,
        COPPER_ORE: 3,
        TIN_ORE: 4,
        IRON_INGOT: 5,
        COPPER_INGOT: 6,
        TIN_INGOT: 7,
        IRON_PLATE: 8,
        COPPER_PLATE: 9,
        TIN_PLATE: 10,
    },
    Name: {
        0: "nothing",
        1: "coal",
        2: "iron ore",
        3: "copper ore",
        4: "tin ore",
        5: "iron ingots",
        6: "copper ingots",
        7: "tin ingots",
        8: "iron plates",
        9: "copper plates",
        10:"tin plates"
    },
};
module.exports = ItemData;