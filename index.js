const { curry2, curry3 } = require('./src/curry/curry');
const { reduce, reduceR, reduceL } = require('./src/reduce/curriedReduce');

const { Option, isOption } = require('./src/option/option');

const Functions = {
    curry2, curry3,
    reduce, reduceR, reduceL,
};

const Types = {
    Option, isOption,
};

module.exports = {
    Functions,
    Types
};
