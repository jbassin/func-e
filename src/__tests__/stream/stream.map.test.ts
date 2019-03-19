import { from } from '../../stream/create/create';
import map from '../../stream/map/map';

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
