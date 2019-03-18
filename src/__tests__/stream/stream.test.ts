import { Stream } from '../../stream/stream';
import { from } from '../../stream/create';

test('Stream: extremely basic stream function', () => {
  const stream = new Stream(siphon => {
    siphon.next(0);
    siphon.next(1);
    siphon.next(2);
    siphon.complete();
  });

  let i = 0;

  stream.siphon({
    next: x => {
      expect(x).toBe(i);
      i++;
    },
    error: () => null,
    complete: () => null,
  });

  i = 0;

  stream.siphon(x => {
    expect(x).toBe(i);
    i++;
  });
});

test('Stream: create stream from arraylike', () => {
  const stream = from([0, 1, 2]);

  let i = 0;

  stream.siphon(x => {
    expect(x).toBe(i);
    i++;
  });
});

test('Stream: stream stops after complete', () => {
  const stream = new Stream(siphon => {
    siphon.next(0);
    siphon.next(0);
    siphon.next(0);
    siphon.complete();
    siphon.next(1);
    siphon.complete();
  });

  stream.siphon(x => {
    expect(x).toBe(0);
  });
});