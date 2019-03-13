import Item from '../item/item';
import ItemStack from './stack';

export default class ItemStackIterator<T> {
  private stack: ItemStack<T>;
  private length: number = 0;
  private index: number = 0;
  private beginning: boolean = true;

  constructor(stack: ItemStack<T>) {
    this.stack = stack;
    this.length = this.stack.length;
  }

  get next(): Item<T> | Item<null> {
    this.beginning = false;
    if (this.index >= this.stack.length) {
      return new Item(null);
    }
    const returnVal: Item<T> = this.stack.getItem(this.index);
    this.index += 1;
    return returnVal;
  }

  get free_next(): T | null {
    return this.next.get;
  }

  get prev(): Item<T> | Item<null> {
    if (this.beginning) {
      return new Item(null);
    }
    if (this.index >= this.stack.length) {
      this.index = this.stack.length - 1;
    }
    const returnVal: Item<T> = this.stack.getItem(this.index);
    this.index -= 1;
    if (this.index === -1) {
      this.index = 0;
      this.beginning = true;
    }
    return returnVal;
  }

  get free_prev(): T | null {
    return this.prev.get;
  }
}
