import { cReduce, cReduceRight } from '../../reduce/reduce';

test('Reduce: sum to 15', () => {
  const data = [1, 2, 3, 4, 5];
  expect(cReduce((a: number, b: number) => a + b, 0, data)).toBe(15);
});

test('Reduce: sum to 0', () => {
  const data = [0, 0, 0, 0, 0];
  expect(cReduce((a: number, b: number) => a + b, 0, data)).toBe(0);
});

test('reduceRight: sum to 15', () => {
  const data = [1, 2, 3, 4, 5];
  expect(cReduceRight((a: number, b: number) => a + b, 0, data)).toBe(15);
});

test('reduceRight: sum to 0', () => {
  const data = [0, 0, 0, 0, 0];
  expect(cReduceRight((a: number, b: number) => a + b, 0, data)).toBe(0);
});

test('Reduce: test tailcall functionality', () => {
  const data = Array.from({length: 1000000}, () => 1);
  expect(cReduce((a: number, b: number) => a + b, 0, data)).toBe(1000000);
});
