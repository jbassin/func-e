import curry from '../curry/curry';
import Item from '../item/item';
import { lift, lower } from '../lift/lift';
import { reduce } from '../reduce/reduce';

export function map<In, Out>(mapper: (input: In) => Out, data: In[]): Out[] {
  return reduce(
    (acc: Out[], con: In): Out[] => {
      acc.push(mapper(con));
      return acc;
    },
    [],
    data,
  );
}

export const cMap = curry(map);

export function mapLift<In, Out>(
  mapper: (input: In) => Out,
  data: In[],
  predicate?: (tester: Out) => boolean,
): Array<Item<Out>> {
  return reduce(
    (acc: Array<Item<Out>>, con: In): Array<Item<Out>> => {
      const item = lift(mapper(con), predicate);
      if (item.isSome) {
        acc.push(item);
      }
      return acc;
    },
    [],
    data,
  );
}

export function mapLower<In, Out>(
  mapper: (input: In) => Out,
  data: Array<Item<In>>,
): Out[] {
  return reduce(
    (acc: Out[], con: Item<In>): Out[] => {
      if (con.isSome) {
        acc.push(mapper(lower(con)));
      }
      return acc;
    },
    [],
    data,
  );
}

export const cMapLift = curry(mapLift);
export const cMapLower = curry(mapLower);
