const { curry2, curry3 } = require('./src/curry/curry');
const { reduce, reduceR, reduceL } = require('./src/reduce/curriedReduce');

const { Option, isOption } = require('./src/option/option');
const { Tailcall } = require('./src/tailcall/tailcall');

const Functions = {
    curry2, curry3,
    reduce, reduceR, reduceL,
};

const Types = {
    Option, isOption,
    Tailcall,
};

module.exports = {
    Functions,
    Types
};
