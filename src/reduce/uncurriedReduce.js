const uncurriedReduceRight = (reducer, initial, data, step) => {
    if (data.length === step) return initial;
    return uncurriedReduceRight(reducer, reducer(initial, data[data.length - 1 - step]), data, step + 1);
};

const unsteppedUncurriedReduceRight = (reducer, initial, data) => {
    return uncurriedReduceRight(reducer, initial, data, 0);
};

const uncurriedReduceLeft = (reducer, initial, data, step) => {
    if (data.length === step) return initial;
    return uncurriedReduceLeft(reducer, reducer(initial, data[step]), data, step + 1);
};

const unsteppedUncurriedReduceLeft = (reducer, initial, data) => {
    return uncurriedReduceRight(reducer, initial, data, 0);
};

module.exports = {
    reduceLeft: unsteppedUncurriedReduceLeft,
    reduceRight: unsteppedUncurriedReduceRight,
};
