import curry from '../curry/curry';
import { reduce } from '../reduce/reduce';

export function map<In, Out>(
  mapper: (input: In) => Out,
  data: In[],
): Out[] {
  return reduce((acc: Out[], con: In): Out[] => {
    acc.push(mapper(con));
    return acc;
  }, [], data);
}

export const cMap = curry(map);
