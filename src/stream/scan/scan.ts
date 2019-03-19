import { IPump, Stream } from '../stream';

export default function scan<T, R>(
  stream: Stream<T>,
  mapper: (drop: T) => R,
): Stream<R> {
  return new Stream<R>((stream.pump as unknown) as IPump<R>, (siphon, next) => {

    siphon.next(mapper((next as unknown) as T));
  });
}
