import { Stream } from '../stream';

export default function filter<T>(
  stream: Stream<T>,
  predicate: (drop: T) => boolean,
) {
  return new Stream<T>(stream.pump, (siphon, next) => {
    if (predicate(next)) {
      siphon.next(next);
    }
  });
}
