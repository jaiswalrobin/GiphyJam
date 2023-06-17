export const debounce = (func, delay) => {
  let id;
  return function (...args) {
    if (id) clearTimeout(id);
    id = setTimeout(() => {
      id = null;
      func.apply(this, args);
    }, delay);
  };
};

export function getRandomColor() {
  const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  return color;
}
