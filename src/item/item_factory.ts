import Item from './item';

export default class ItemFactory {
  private readonly predicate: (tester: any) => boolean;

  constructor(predicate?: (tester: any) => boolean) {
    if (predicate) {
      this.predicate = predicate;
    } else {
      this.predicate = (tester: any): boolean => {
        return (tester !== null && tester !== undefined);
      };
    }
  }

  public new<T>(item: T): Item<T> {
    return new Item<T>(item, this.predicate);
  }

}
