import { isItem } from './item_helpers';

export default class Item<T> {
  private readonly localValue: T;
  private readonly predicate: (tester: T) => boolean;
  private readonly isSomeLocal: boolean;

  constructor(value: T | Item<T>, predicate?: (tester: T) => boolean) {
    if (predicate) {
      this.predicate = predicate;
    } else {
      this.predicate = (tester: T): boolean => {
        return tester !== null && tester !== undefined;
      };
    }

    if (isItem(value)) {
      this.localValue = (value as Item<T>).get;
    } else {
      this.localValue = value as T;
    }

    this.isSomeLocal = this.predicate(this.localValue);
  }

  get get(): T {
    return this.localValue;
  }

  get type(): string {
    if (this.isSomeLocal) {
      return typeof this.localValue;
    } else {
      return 'none';
    }
  }

  get isSome(): boolean {
    return this.isSomeLocal;
  }

  public getOrElse<R>(orElse: R): T | R {
    if (this.isSomeLocal) {
      return this.localValue as T;
    } else {
      return orElse;
    }
  }
}
