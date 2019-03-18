import { Stream } from "./stream";

export function from<T>(collection: T[]): Stream<T> {
  return new Stream<T>(siphon => {
    collection.forEach(element => {
      siphon.next(element);
    });
    siphon.complete;
  });
}