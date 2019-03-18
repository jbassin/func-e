export interface IPump<T> {
  (siphon: ISiphon<T>): void;
}

export interface ISiphon<T> {
  next: (next: T) => void;
  error: (error: any) => void;
  complete: () => void;
}

export interface INext<T> {
  (next: T): void;
}

export class Stream<T> {
  private _pump: IPump<T>;

  constructor(pump: IPump<T>) {
    this._pump = pump;
  }

  public siphon(siphon: ISiphon<T> | INext<T>): void {
    let newSiphon = siphon;
    if ((siphon as ISiphon<T>).next === undefined) {
      newSiphon = {
        next: siphon as INext<T>,
        error: (x) => { throw new Error(x); },
        complete: () => {},
      }
    }
    this._pump(newSiphon as ISiphon<T>);
  }
}