const { Option, isOption } = require('../../src/option/option');

test('createOption: create correctly formed option', () => {
    const newOption = new Option(0);
    expect(newOption.value === 0).toBe(true);
    expect(newOption.type).toBe("number");
    expect(newOption.isSome).toBe(true);
    expect(newOption.getOrElse(2)).toBe(0);
});

test('isOption: correctly identifies options', () => {
    const a = new Option('a');
    const b = new Option(null);
    let d;
    const c = new Option(d);
    expect(isOption(a)).toBe(true);
    expect(isOption(b)).toBe(true);
    expect(isOption(c)).toBe(true);
    expect(isOption({})).toBe(false);
});

test('isSome: correctly identifies Some', () => {
    const a = new Option('a');
    const b = new Option(null);
    let d;
    const c = new Option(d);
    const e = new Option(0);
    expect(a.isSome).toBe(true);
    expect(b.isSome).toBe(false);
    expect(c.isSome).toBe(false);
    expect(e.isSome).toBe(true);
});

test('getOrElse: correctly gets or else', () => {
    const a = new Option('a');
    const b = new Option(null);
    expect(a.getOrElse(0)).toBe('a');
    expect(b.getOrElse(0)).toBe(0);
});
