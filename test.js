const input = new (require("./InputValidator"))();


let count = 1;
let failedTests = 0;
let successfulTests = 0;

function assert(test, name) {
    let id = count;
count++;
if (typeof test != "boolean") {
    console.log("Non boolean detected in \"" + name + "\" test case");
} else {
    if (!test) {
        console.log("Test" + id + " failed: " + name);
        failedTests++;
    } else
        successfulTests++;
}
}

assert(input.validate(0, "int"), "Is zero int");

assert(input.validate(0, "int"), "Is zero int");
assert(!input.validate(Number.MAX_SAFE_INTEGER + 1, "int"), "Test for higher than int");
assert(!input.validate(Number.MIN_SAFE_INTEGER - 1, "int"), "Test for lower than int");
assert(input.validate(Number.MAX_SAFE_INTEGER, "int"), "Test for high int");
assert(input.validate(Number.MIN_SAFE_INTEGER, "int"), "Test for low int");
assert(!input.validate(123123.123123, "int"), "Double as int");
assert(!input.validate(NaN, "int"), "Not a number as int");
assert(!input.validate(Infinity, "int"), "Infinity as int");
assert(!input.validate(-Infinity, "int"), "-Infinity as int");
assert(!input.validate(undefined, "int"), "Undefined as int");

assert(input.validate(0, "double"), "Is zero double");
assert(!input.validate(Infinity, "double"), "Is Infinity double");
assert(!input.validate(-Infinity, "double"), "Is -Infinity double");
assert(input.validate(9292.9292929, "double", {max: 9292.9292929, min: -9292.9292929}), "Test upper bound inside");
assert(!input.validate(9292.929293, "double", {max: 9292.9292929, min: -9292.9292929}), "Test upper bound outside");
assert(input.validate(-9292.9292929, "double", {max: 9292.9292929, min: -9292.9292929}), "Test lower bound inside");
assert(!input.validate(-9292.929293, "double", {max: 9292.9292929, min: -9292.9292929}), "Test lower bound outside");

assert(!input.validate(1, "string"),"Check if number is string");
assert(input.validate("123123", "string"),"Check if string is string");
assert(!input.validate("999999999", "string",{min:10}),"Check min outer");
assert(input.validate("9999999999", "string",{min:10}),"Check min inner");
assert(input.validate("9999999999", "string",{max:10}),"Check max inner");
assert(!input.validate("99999999999", "string",{max:10}),"Check max outer");




