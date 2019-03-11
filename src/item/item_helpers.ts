import Item from './item';

export function isItem(item: any): boolean {
  if (item === undefined || item === null) {
    return false;
  } else {
    return item instanceof Item;
  }
}
