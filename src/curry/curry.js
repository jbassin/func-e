export default function curry(func) {
  const argLength = func.length;
  return function(...args) {
    if (args < argLength) return curry(func.bind(this, ...args));
    else return func.call(this, ...args);
  };
}
