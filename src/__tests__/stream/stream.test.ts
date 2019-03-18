import { Stream } from '../../stream/stream';
import { from } from '../../stream/create';
import map from '../../stream/map/map';
import filter from '../../stream/filter/filter';

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

test('Map (Stream): create mapped stream from existing stream', () => {
  const stream = from([0, 1, 2, 3, 4, 5]);
  const mappedStream = map(stream, x => x + 1);
  const revertedStream = map(mappedStream, x => x - 1);

  let i = 0;
  stream.siphon(x => {
    expect(x).toBe(i);
    i++;
  });

  i = 1;
  mappedStream.siphon(x => {
    expect(x).toBe(i);
    i++;
  });

  i = 0;
  revertedStream.siphon(x => {
    expect(x).toBe(i);
    i++;
  });
});

test('Filter (Stream): create filtered stream from existing stream', () => {
  const stream = from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const filteredStream = filter(stream, x => x % 2 === 0);
  const mappedStream = map(filteredStream, x => x + 1);
  const doubleFilteredStream = filter(mappedStream, x => x % 3 === 0);

  let i = 0;
  stream.siphon(x => {
    expect(x).toBe(i);
    i++;
  });

  i = 0;
  filteredStream.siphon(x => {
    expect(x).toBe(i * 2);
    i++;
  });

  i = 1;
  mappedStream.siphon(x => {
    expect(x).toBe(i * 2 - 1);
    i++;
  });

  i = 0;
  doubleFilteredStream.siphon(x => {
    expect(x).toBe(i * 6 + 3);
    i++;
  });
});