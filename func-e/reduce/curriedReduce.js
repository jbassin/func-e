const { curry3 } = require('../curry/curry');
const { reduceLeft, reduceRight } = require('./uncurriedReduce');

const reduce = curry3(reduceRight);
const reduceR = reduce;
const reduceL = curry3(reduceLeft);

module.exports = {
    reduce,
    reduceR,
    reduceL,
};
