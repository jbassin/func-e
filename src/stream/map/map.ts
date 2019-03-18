import { Stream, IPump, HijackType, IHijackTransform } from "../stream";

export default function map<T, R>(stream: Stream<T>, mapper: (drop: T) => R): Stream<R> {
  return new Stream<R>(stream.pump as unknown as IPump<R>, stream.hijacks.concat([({
    type: HijackType.Transform,
    transform: (next: T) => mapper(next),
  }) as IHijackTransform<R>]));
}