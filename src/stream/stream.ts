export interface IPump<T> {
  (siphon: ISiphon<T>): void;
}

export interface ISiphon<T> {
  next: (next: T) => void;
  error: (error: any) => void;
  complete: () => void;
  [propName: string]: any;
}

interface ISiphonExtended {
  isComplete: boolean;
}

export interface INext<T> {
  (next: T): void;
}

export enum HijackType {
  Transform,
  Predicate,
}

export interface IHijack<T> {
  type: HijackType,
}

export interface IHijackPredicate<T> extends IHijack<T> {
  predicate: (next: T) => boolean,
}

export interface IHijackTransform<T> extends IHijack<T> {
  transform: (next: any) => T,
}

export class Stream<T> {
  private _pump: IPump<T>;
  private _hijacks: IHijack<T>[];

  constructor(pump: IPump<T>, hijacks?: IHijack<T>[]) {
    this._pump = pump;
    if (hijacks) {
      this._hijacks = hijacks;
    } else {
      this._hijacks = [];
    }
  }

  get pump(): IPump<T> {
    return this._pump;
  }

  get hijacks(): IHijack<T>[] {
    return this._hijacks;
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
          let newNext = next;
          this._hijacks.forEach(element => {
            if (element.type === HijackType.Predicate && !(element as IHijackPredicate<T>).predicate(newNext)) {
              return;
            } else {
              newNext = (element as IHijackTransform<T>).transform(newNext);
            }
          });
          siphon.next(newNext);
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