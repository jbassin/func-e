const { curry2, curry3 } = require('../../src/curry/curry');

test('curry2: Function is curried successfully', () => {
    const uncurriedAdd2 = (a, b) => a + b;
    const add2 = curry2(uncurriedAdd2);
    expect(add2(1)(2)).toBe(3);
});

test('curry3: Function is curried successfully', () => {
    const uncurriedAdd3 = (a, b, c) => a + b + c;
    const add2 = curry3(uncurriedAdd3);
    expect(add2(1)(2)(3)).toBe(6);
});
