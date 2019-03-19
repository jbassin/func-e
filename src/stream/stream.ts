import { ISiphon } from './stream';

export type IPump<T> = (siphon: ISiphon<T>) => void;

export interface ISiphon<T> {
  next: (next: T) => void;
  error: (error: any) => void;
  complete: () => void;
  [propName: string]: any;
}

interface ISiphonExtended {
  isComplete: boolean;
}

export type INext<T> = (next: T) => void;

export class Stream<T> {
  private readonly _pump: IPump<T>;

  constructor(pump: IPump<T>) {
    this._pump = (siphon: ISiphon<T>) => {
      let shim: ISiphon<T> & ISiphonExtended;
      shim = {
        isComplete: false,
        next: x => {
          if (!shim.isComplete) {
            siphon.next(x);
          }
        },
        error: x => {
          if (!shim.isComplete) {
            siphon.error(x);
          }
        },
        complete: () => {
          if (!shim.isComplete) {
            siphon.complete();
            shim.isComplete = true;
          }
        },
      };
      pump(shim);
    };
  }

  get pump(): IPump<T> {
    return this._pump;
  }

  public siphon(siphon: ISiphon<T> | INext<T>): void {
    let newSiphon = siphon;
    if ((siphon as ISiphon<T>).next === undefined) {
      newSiphon = {
        next: siphon as INext<T>,
        error: (x: any) => {
          throw new Error(x);
        },
        complete: (): void => {
          return;
        },
      };
    }
    this._pump(newSiphon as ISiphon<T>);
  }
}
