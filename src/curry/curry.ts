export default function curry(func: any) {
  const argLength = func.length;
  return function(...args: any[]) {
    if (args < argLength) {
      // @ts-ignore
      return curry(func.bind(this as any, ...args));
    }
    // @ts-ignore
    return func.call(this as any, ...args);
  };
}
