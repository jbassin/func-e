import { from } from '../../stream/create/create';
import scan from '../../stream/scan/scan';

test('Scan (Stream): Scan correctly sums', () => {
  const adder = scan( (sum: number, x: number) => sum + x, 0, from([1, 1, 1, 1, 1]));

  let i = 1;
  adder.siphon(x => {
    expect(x).toBe(i);
    i++;
  });
});
