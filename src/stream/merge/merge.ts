import { ISiphon, Stream } from '../stream';

export default function merge<T>(stream1: Stream<T>, stream2: Stream<T>): Stream<T> {
  return new Stream((siphon: ISiphon<T>) => {
    stream1.siphon({
      next: next => siphon.next(next),
      error: error => siphon.error(error),
      complete: () => siphon.complete(),
    });
    stream2.siphon({
      next: next => siphon.next(next),
      error: error => siphon.error(error),
      complete: () => siphon.complete(),
    });
  });
}
