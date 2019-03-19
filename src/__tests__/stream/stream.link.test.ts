import link from '../../stream/link/link';
import { Stream } from '../../stream/stream';

test('Link (Stream): Successfully forwards callbacks', () => {
  const stream = new Stream(siphon => {
    siphon.next(0);
    siphon.next(0);
    siphon.next(0);
    siphon.complete();
    siphon.next(1);
    siphon.complete();
  });

  const linkedStream = new Stream(link(stream));

  linkedStream.siphon(x => {
    expect(x).toBe(0);
  });
});
