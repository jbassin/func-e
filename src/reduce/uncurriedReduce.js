const { isOption } = require('../option/option');
const { Tailcall } = require('../tailcall/tailcall');

const uncurriedReduce = (reducer, initial, data, fromLeft, step) => {
    if (data.length === step) return uncurriedReduce.tailcall.done(initial);

    let item;
    if (fromLeft) item = data[step];
    else item = data[data.length - 1 - step];

    if (isOption(item)) {
        if (item.isSome) return uncurriedReduce.tailcall.next(reducer, reducer(initial, item.value), data, fromLeft, step + 1);
        else return uncurriedReduce.tailcall.next(reducer, initial, data, fromLeft, step + 1);
    }
    return uncurriedReduce.tailcall.next(reducer, reducer(initial, item), data, fromLeft, step + 1);
};

const unsteppedUncurriedReduceRight = (reducer, initial, data) => {
    const tailcallReduce = new Tailcall(uncurriedReduce);
    return tailcallReduce.run(reducer, initial, data, false, 0);
};

const unsteppedUncurriedReduceLeft = (reducer, initial, data) => {
    const tailcallReduce = new Tailcall(uncurriedReduce);
    return tailcallReduce.run(reducer, initial, data, true, 0);
};

module.exports = {
    reduceLeft: unsteppedUncurriedReduceLeft,
    reduceRight: unsteppedUncurriedReduceRight,
};
