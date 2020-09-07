export function createDebouncedFn(fn: Function, timeoutMillis: number) {
  let timer: any;
  return function () {
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(null, args);
    }, timeoutMillis);
  };
}
