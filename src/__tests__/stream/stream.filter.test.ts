import { from } from '../../stream/create/create';
import filter from '../../stream/filter/filter';
import map from '../../stream/map/map';

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
