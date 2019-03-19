import link from '../link/link';
import { Stream } from '../stream';

export default function map<T, R>(
  mapper: (drop: T) => R,
  stream: Stream<T>,
): Stream<R> {
  return new Stream<R>(
    link((stream as unknown) as Stream<R>, (siphon, next) => {
      siphon.next(mapper((next as unknown) as T));
    }),
  );
}
