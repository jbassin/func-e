import Item from '../item/item';
import ItemFactory from '../item/item_factory';
import { isItem } from '../item/item_helpers';

export function lift<T>(
  input: T | Item<T>,
  predicate?: (tester: T) => boolean,
): Item<T> {
  if (predicate) {
    return new ItemFactory(predicate).new(input);
  }

  if (isItem(input)) {
    return input as Item<T>;
  }
  return new ItemFactory<T>().new(input);
}

export function lower<T>(input: T | Item<T>): T {
  if (isItem(input)) {
    return (input as Item<T>).get;
  }
  return input as T;
}
