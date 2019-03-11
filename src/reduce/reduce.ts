import curry from '../curry/curry';

function unsteppedReduce<Data, Initial>(
  reducer: (accumulator: Initial, concatenator: Data) => Initial,
  initial: Initial,
  data: Data[],
  step: number,
  fromRight: boolean,
): Initial {
  if (step === data.length) {
    return initial;
  }

  let currentItem: any = null;
  if (fromRight === true) {
    currentItem = data[data.length - step - 1];
  } else {
    currentItem = data[step];
  }

  return unsteppedReduce(
    reducer,
    reducer(initial, currentItem),
    data,
    step + 1,
    fromRight,
  );
}

function steppedReduce<Data, Initial>(
  reducer: (accumulator: Initial, concatenator: Data) => Initial,
  initial: Initial,
  data: Data[],
  fromRight: boolean,
): Initial {
  return unsteppedReduce<Data, Initial>(reducer, initial, data, 0, fromRight);
}

export function reduce<Data, Initial>(
  reducer: (accumulator: Initial, concatenator: Data) => Initial,
  initial: Initial,
  data: Data[],
): Initial {
  return steppedReduce<Data, Initial>(reducer, initial, data, false);
}

export const cReduce = curry(reduce);

export function reduceRight<Data, Initial>(
  reducer: (accumulator: Initial, concatenator: Data) => Initial,
  initial: Initial,
  data: Data[],
): Initial {
  return steppedReduce<Data, Initial>(reducer, initial, data, true);
}

export const cReduceRight = curry(reduceRight);

export function reduceInitial<Data, Initial>(
  reducer: (accumulator: Initial, concatenator: Data) => Initial,
  data: Initial[],
): Initial {
  return steppedReduce<Data, Initial>(reducer, data[0], data as unknown as Data[], false);
}

export const cReduceInitial = curry(reduceInitial);

export function reduceInitialRight<Data, Initial>(
  reducer: (accumulator: Initial, concatenator: Data) => Initial,
  data: Initial[],
): Initial {
  return steppedReduce<Data, Initial>(reducer, data[0], data as unknown as Data[], true);
}

export const cReduceInitialRight = curry(reduceInitialRight);
