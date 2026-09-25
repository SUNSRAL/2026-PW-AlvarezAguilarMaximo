// 01-arreglos.js
// Métodos de arreglo más usados en JS/Node — practícalos sobre esta lista
// de talleres (misma forma que la API real de CECyT9). Completa cada TODO.

const talleres = [
  { nombre: 'Introducción a Python', instructor: 'Ing. María López', cupo: 25, inscritos: 25 },
  { nombre: 'Fundamentos de Redes', instructor: 'Ing. Carlos Ramírez', cupo: 30, inscritos: 18 },
  { nombre: 'Diseño de Bases de Datos', instructor: 'Ing. Ana Torres', cupo: 20, inscritos: 20 },
  { nombre: 'Desarrollo Web con JS', instructor: 'Ing. María López', cupo: 25, inscritos: 10 },
];

// TODO: forEach — imprime "- <nombre> (<inscritos>/<cupo>)" de cada taller
console.log("\nAplicando un forEach para imprimir los talleres:");
talleres.forEach((t) => console.log(`- ${t.nombre} (${t.inscritos}/${t.cupo})`));

// TODO: map — crea un arreglo `nombres` solo con los nombres de los talleres
console.log("\nAplicando funcion Map con solo Nombres")
const nombres = talleres.map((t) => t.nombre);
console.log(nombres);

// TODO: filter — crea un arreglo `llenos` con los talleres donde inscritos >= cupo

console.log("\nAplicando la función Filter en los talleres")
const llenos = talleres.filter((t) => t.inscritos >= t.cupo);
console.log(llenos.map((t)=> t.nombre))


// TODO: find — encuentra el PRIMER taller impartido por 'Ing. María López'
console.log("\nAplicando la función Find en los talleres")
const tallerMaria = talleres.find((t) => t.instructor === 'Ing. María López');
console.log('Primer taller de María López: ' + tallerMaria.nombre);

// TODO: reduce — calcula `totalInscritos`, la suma de inscritos de todos los talleres

console.log("\nAplicando la función Reduce en los talleres")
const totalInscritos = talleres.reduce((total, t) => total + t.inscritos, 0);
console.log('El total de inscritos es: ' + totalInscritos);

// TODO: filter + map encadenados — nombres de los talleres que SÍ tienen cupo disponible
console.log('Aplicando la función filter con la función map');
const conCupo = talleres.filter((t) => t.inscritos < t.cupo);
const nombresCupo = conCupo.map((t,indice) => `${indice + 1}: ${t.nombre} \n`).join('');
console.log('Talleres con cupo disponible:\n');
console.log(nombresCupo);
