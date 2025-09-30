// archivo math.js
export const PI = 3.1416;

export function suma(a, b) {
  return a + b;
}

// exportación por defecto (solo una por archivo)
export default function resta(a, b) {
  return a - b;
}

/*
export {
  suma as add, // alias para suma
  resta as subtract // alias para resta
}
*/