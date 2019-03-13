import ItemFactory from '../../item/item_factory';
import ItemStack from '../../stack/stack';

test('Stack: Accepts inputs and ejects correctly', () => {
  const a = new ItemStack(new ItemFactory());
  a.add(1);
  a.add(2);
  a.add(3, 4, 5);
  const b = a.eject();

  for (let i = 0; i < 5; i++) {
    expect(b[i].getOrElse(null)).toBe(i + 1);
  }
});

test('Iterator: Successfully iterates through stack', () => {
  const a = new ItemStack(new ItemFactory());
  a.add(1);
  a.add(2);
  a.add(3, 4, 5);
  const iter = a.iterator();

  let c = iter.next;
  let i = 1;
  while( c.type !== 'none' ) {
    expect(c.getOrElse(null)).toBe(i);
    i += 1;
    c = iter.next;
  }

  c = iter.next;
  expect(c.getOrElse(null)).toBe(null);

  c = iter.prev;
  i = 5;
  while ( c.type !== 'none' ) {
    expect(c.getOrElse(null)).toBe(i);
    i -= 1;
    c = iter.prev;
  }
});
