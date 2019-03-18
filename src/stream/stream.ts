import { anyTypeAnnotation } from "@babel/types";

export interface IPump<T> {
  (siphon: ISiphon<T>): void;
}

export interface ISiphon<T> {
  next: (next: T) => void;
  error: (error: any) => void;
  complete: () => void;
}

interface ISiphonExtended {
  isComplete: boolean;
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
    this.runPump(newSiphon as ISiphon<T>);
  }

  private runPump(siphon: ISiphon<T>): void {
    let newSiphon: ISiphon<T> & ISiphonExtended = {
      isComplete: false,
      next: (next: T) => {
        if (!newSiphon.isComplete) {
          siphon.next(next);
        }
      },
      error: (error: any) => {
        if (!newSiphon.isComplete) {
          siphon.error(error);
        }
        siphon.error
      },
      complete: () => {
        if (!newSiphon.isComplete) {
          siphon.complete();
          newSiphon.isComplete = true;
        }
      }
    }
    this._pump(newSiphon);
  }
}