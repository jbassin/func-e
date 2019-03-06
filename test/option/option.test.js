const Option = require('../../src/option/option');

test('createOption: create correctly formed option', () => {
    const newOption = Option.createOption(0);
    expect(newOption.func_e_option == null).toBe(false);
    expect(newOption.optionType == null).toBe(false);
    expect(newOption.optionValue == null).toBe(false);
    expect(newOption.getOrElse == null).toBe(false);
});

test('isOption: correctly identifies options', () => {
    const a = Option.createOption('a');
    const b = Option.createOption(null);
    let d;
    const c = Option.createOption(d);
    expect(Option.isOption(a)).toBe(true);
    expect(Option.isOption(b)).toBe(true);
    expect(Option.isOption(c)).toBe(true);
    expect(Option.isOption({})).toBe(false);
});

test('isSome: correctly identifies Some', () => {
    const a = Option.createOption('a');
    const b = Option.createOption(null);
    let d;
    const c = Option.createOption(d);
    const e = Option.createOption(0);
    expect(Option.isSome(a)).toBe(true);
    expect(Option.isSome(b)).toBe(false);
    expect(Option.isSome(c)).toBe(false);
    expect(Option.isSome({})).toBe(false);
    expect(Option.isSome(e)).toBe(true);
});

test('getOrElse: correctly gets or else', () => {
    const a = Option.createOption('a');
    const b = Option.createOption(null);
    expect(a.getOrElse(0)).toBe('a');
    expect(b.getOrElse(0)).toBe(0);
});
