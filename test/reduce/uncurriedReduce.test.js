const { reduceRight, reduceLeft } = require('../../src/reduce/uncurriedReduce');

test('reduceRight: sum to 15', () => {
   const data = [1, 2, 3, 4, 5];
   expect(reduceRight((a, b) => a + b, 0, data)).toBe(15);
});

test('reduceRight: sum to 0', () => {
    const data = [0, 0, 0, 0, 0];
    expect(reduceRight((a, b) => a + b, 0, data)).toBe(0);
});

test('reduceLeft: sum to 15', () => {
    const data = [1, 2, 3, 4, 5];
    expect(reduceLeft((a, b) => a + b, 0, data)).toBe(15);
});

test('reduceLeft: sum to 0', () => {
    const data = [0, 0, 0, 0, 0];
    expect(reduceLeft((a, b) => a + b, 0, data)).toBe(0);
});

test('reduceRight: test tailcall functionality', () => {
    const data = Array.from({length: 1000000}, () => 1);
    expect(reduceRight((a, b) => a + b, 0, data)).toBe(1000000);
});
