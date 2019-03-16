import Item from './item/item';
import { isItem } from './item/item_helpers';

import curry from './curry/curry';

import {
  cReduce,
  cReduceInitial,
  cReduceInitialRight,
  cReduceRight,
  reduce,
  reduceInitial,
  reduceInitialRight,
  reduceRight,
} from './reduce/reduce';

import Tailcall from './tailcall/tailcall';

export = {
  // Functions
  isItem,
  curry,

  reduce,
  reduceInitial,
  cReduce,
  cReduceInitial,
  reduceRight,
  reduceInitialRight,
  cReduceRight,
  cReduceInitialRight,

  // Classes
  Item,
  Tailcall,
};
