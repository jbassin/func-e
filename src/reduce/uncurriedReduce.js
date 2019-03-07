const { Option, isOption } = require('../option/option');

const uncurriedReduceRight = (reducer, initial, data, step) => {
    if (data.length === step) return initial;
    const item = data[data.length - 1 - step];
    if (isOption(item)) {
        if (item.isSome) return uncurriedReduceRight(reducer, reducer(initial, item.value), data, step + 1);
        else return uncurriedReduceRight(reducer, initial, data, step + 1);
    }
    return uncurriedReduceRight(reducer, reducer(initial, item), data, step + 1);
};

const unsteppedUncurriedReduceRight = (reducer, initial, data) => {
    return uncurriedReduceRight(reducer, initial, data, 0);
};

const uncurriedReduceLeft = (reducer, initial, data, step) => {
    if (data.length === step) return initial;
    const item = data[step];
    if (isOption(item)) {
        if (item.isSome) return uncurriedReduceLeft(reducer, reducer(initial, item.value), data, step + 1);
        else return uncurriedReduceLeft(reducer, initial, data, step + 1);
    }
    return uncurriedReduceLeft(reducer, reducer(initial, item), data, step + 1);
};

const unsteppedUncurriedReduceLeft = (reducer, initial, data) => {
    return uncurriedReduceRight(reducer, initial, data, 0);
};

module.exports = {
    reduceLeft: unsteppedUncurriedReduceLeft,
    reduceRight: unsteppedUncurriedReduceRight,
};
