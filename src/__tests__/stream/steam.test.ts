import { Stream } from '../../stream/stream';

test('Steam: extremely basic stream function', () => {
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