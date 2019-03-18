import { Stream, HijackType, IHijackPredicate } from "../stream";

export default function filter<T>(stream: Stream<T>, predicate: (drop: T) => boolean) {
  return new Stream<T>(stream.pump, stream.hijacks.concat([({
    type: HijackType.Predicate,
    predicate: predicate,
  }) as IHijackPredicate<T>]));
}