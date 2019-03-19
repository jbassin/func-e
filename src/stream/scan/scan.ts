import link from '../link/link';
import { IPump, ISiphon, Stream } from '../stream';

type IReducer<T, R> = (accumulator: R, concatenator: T) => R;

export default function scan<T, R>(
  stream: Stream<T>,
  scanner: IReducer<T, R>,
  initial: R
): Stream<R> {
  const nextShim = () => {
    let accumulator = initial;
    return (siphon: ISiphon<T>, next: T) => {
      accumulator = scanner(accumulator, next);
      (siphon as unknown as ISiphon<R>).next(accumulator);
    };
  };
  return new Stream<R>(link(stream, nextShim()) as unknown as IPump<R>);
}
