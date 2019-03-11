export default class Item<T> {
  private readonly localValue: T | null;

  constructor(value: T) {
    if (value === null || value === undefined) {
      this.localValue = null;
    } else {
      this.localValue = value;
    }
  }

  get get(): T | null {
    return this.localValue;
  }

  get type(): string {
    if (this.isSome) {
      return typeof this.localValue;
    } else {
      return 'none';
    }
  }

  get isSome(): boolean {
    return !(this.localValue === null);
  }

  public getOrElse<R>(orElse: R): T | R {
    if (this.isSome) {
      return this.localValue as T;
    } else {
      return orElse;
    }
  }
}
