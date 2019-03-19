import { IPump, ISiphon, Stream } from '../stream';

export type INextShim<T> = (siphon: ISiphon<T>, next: T) => void;
export type IErrorShim<T> = (siphon: ISiphon<T>, error: any) => void;
export type ICompleteShim<T> = (siphon: ISiphon<T>) => void;

export default function link<T>(
  stream: Stream<T>,
  nextShim?: INextShim<T>,
  errorShim?: IErrorShim<T>,
  completeShim?: ICompleteShim<T>,
): IPump<T> {

  let nextShimFunc: INextShim<T>;
  if (nextShim) {
    nextShimFunc = nextShim;
  } else {
    nextShimFunc = (siphon: ISiphon<T>, next: T) => {
      siphon.next(next);
    };
  }

  let errorShimFunc: INextShim<T>;
  if (errorShim) {
    errorShimFunc = errorShim;
  } else {
    errorShimFunc = (siphon: ISiphon<T>, error: any) => {
      siphon.error(error);
    };
  }

  let completeShimFunc: ICompleteShim<T>;
  if (completeShim) {
    completeShimFunc = completeShim;
  } else {
    completeShimFunc = (siphon: ISiphon<T>) => {
      siphon.complete();
    };
  }

  return (siphon: ISiphon<T>) => {
    stream.siphon({
      next: (next: T): void => {
        nextShimFunc(siphon, next);
      },
      error: (error: any): void => {
        errorShimFunc(siphon, error);
      },
      complete: (): void => {
        completeShimFunc(siphon);
      },
    });
  };
}
