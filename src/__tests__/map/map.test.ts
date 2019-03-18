import { map, mapLift } from '../../map/map';

test('Map: Successfully increments each item in the array by one', () => {
  const add = (a: number): number | null => (a + 1);
  const tester = [0, 1, 2, 3, 4, 5];

  // const iter = Array.from(tester, add);
  const iter = map(add, tester);
  for (let i = 0; i < iter.length; i++) {
    expect(iter[i]).toBe(i + 1);
  }
});

// test('Map: Tests tailcall functionality', () => {
//   const add = (a: number): number | null => (a + 1);
//   const tester = Array.from({ length: 1000000 }, (v, i) => i);

//   const iter = map(add, tester);
//   for (let i = 0; i < iter.length; i++) {
//     expect(iter[i]).toBe(i + 1);
//   }
// });

test('MapLift and MapLower: Testes automatic type lifting', () => {
  const add = (a: number): number | null => (a + 1);
  const tester = Array.from({ length: 10 }, (v, i) => i);

  const noEvens = mapLift(add, tester, (a) => a as number % 2 === 0);
  for (let i = 0; i < noEvens.length; i++) {
    expect(noEvens[i].get).toBe((i + 1) * 2);
  }
});
