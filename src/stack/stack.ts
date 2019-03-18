import Item from '../item/item';
import ItemFactory from '../item/item_factory';
import { reduce } from '../reduce/reduce';
import ItemStackIterator from './stack_iterator';

export default class ItemStack<T> {
  private stack: Array<Item<T>> = [];
  private factory: ItemFactory<T>;

  constructor(factory: ItemFactory<T>, ...items: T[]) {
    this.factory = factory;
    this.add(...items);
  }

  public add(...items: T[]): void {
    if (items.length === 1) {
      const item: Item<T> = this.factory.new(items[0]);
      this.stack = this.stack.concat(item.isSome ? [item] : []);
    } else if (items.length > 1) {
      this.stack = this.stack.concat(this.sanitize(items));
    }
  }

  public eject(): Array<Item<T>> {
    return this.stack;
  }

  public iterator(): ItemStackIterator<T> {
    return new ItemStackIterator<T>(this);
  }

  public getItem(index: number): Item<T> {
    return this.stack[index];
  }

  public get length(): number {
    return this.stack.length;
  }

  private sanitize(array: T[]): Array<Item<T>> {
    return reduce(
      (acc: Array<Item<T>>, con: T): Array<Item<T>> => {
        const item: Item<T> = this.factory.new(con);
        if (item.isSome) {
          return acc.concat([item]);
        } else {
          return acc;
        }
      },
      [],
      array,
    );
  }
}
