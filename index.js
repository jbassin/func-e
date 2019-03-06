const { curry2, curry3 } = require('./src/curry/curry');
const { reduce, reduceR, reduceL } = require('./src/reduce/curriedReduce');

const Option = require('./src/option/option');

const Functions = {
    curry2, curry3,
    reduce, reduceR, reduceL,
};

module.exports = {
    Functions,
    Option,
};
