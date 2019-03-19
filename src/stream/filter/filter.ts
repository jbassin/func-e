import link from '../link/link';
import { Stream } from '../stream';

export default function filter<T>(
  predicate: (drop: T) => boolean,
  stream: Stream<T>,
) {
  return new Stream<T>(
    link(stream, (siphon, next) => {
      if (predicate(next)) {
        siphon.next(next);
      }
    }),
  );
}
