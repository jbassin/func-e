import Item from '../../item/item';
import { isItem } from '../../item/item_helpers';

test('Item: correctly identifies Items', () => {
  const a = new Item('a');
  const b = new Item(null);
  const d = undefined;
  const c = new Item(d);
  const e = new Item(0);
  expect(isItem(a)).toBe(true);
  expect(isItem(b)).toBe(true);
  expect(isItem(c)).toBe(true);
  expect(isItem(e)).toBe(true);
  expect(isItem({})).toBe(false);
});
