import Item from './item';

export default class ItemFactory<T> {
  private readonly predicate: (tester: T) => boolean;

  constructor(predicate?: (tester: T) => boolean) {
    if (predicate) {
      this.predicate = predicate;
    } else {
      this.predicate = (tester: T): boolean => {
        return tester !== null && tester !== undefined;
      };
    }
  }

  public new(item: T | Item<T>): Item<T> {
    return new Item<T>(item, this.predicate);
  }
}
