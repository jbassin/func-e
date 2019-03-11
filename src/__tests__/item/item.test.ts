import Item from '../../item/item';

test('Item: Create correctly formed Item', () => {
  const some = new Item<number>(0);
  expect(some.get).toBe(0);
  expect(some.type).toBe('number');
  expect(some.isSome).toBe(true);
  expect(some.getOrElse('a')).toBe(0);

  const none = new Item(null);
  expect(none.get).toBe(null);
  expect(none.type).toBe('none');
  expect(none.isSome).toBe(false);
  expect(none.getOrElse('a')).toBe('a');
});

test('Item: correctly identifies Some', () => {
  const a = new Item('a');
  const b = new Item(null);
  const d = undefined;
  const c = new Item(d);
  const e = new Item(0);
  expect(a.isSome).toBe(true);
  expect(b.isSome).toBe(false);
  expect(c.isSome).toBe(false);
  expect(e.isSome).toBe(true);
});

test('Item: correctly gets or else', () => {
  const a = new Item('a');
  const b = new Item(null);
  expect(a.getOrElse(0)).toBe('a');
  expect(b.getOrElse(0)).toBe(0);
});
