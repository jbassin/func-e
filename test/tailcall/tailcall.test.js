const { Tailcall } = require('../../src/tailcall/tailcall');

test('Tailcall: testing on function that overflows stack', () => {
    function overflow(step) {
        if (step === 0) {
            overflow.tailcall.done(8);
        }
        overflow.tailcall.next(step - 1);
    }
    const tester = new Tailcall(overflow);
    expect(tester.run(100000)).toBe(8);
});

test('Tailcall: testing on arrow function that overflows stack', () => {
    const overflow = (step) => {
        if (step === 0) {
            return overflow.tailcall.done(18);
        }
        overflow.tailcall.next(step - 1);
    };
    const tester = new Tailcall(overflow);
    expect(tester.run(100000)).toBe(18);
});
