const { curry2, curry3 } = require('./src/curry/curry');
const { reduce, reduceR, reduceL } = require('./src/reduce/curriedReduce');

module.exports = {
    curry2, curry3,
    reduce, reduceR, reduceL,
};
