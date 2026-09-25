

const talleres = [
    { nombre: 'Introducción a Python', instructor: 'Ing. María López', cupo: 25, inscritos: 25 },
    { nombre: 'Fundamentos de Redes', instructor: 'Ing. Carlos Ramírez', cupo: 30, inscritos: 18 },
    { nombre: 'Diseño de Bases de Datos', instructor: 'Ing. Ana Torres', cupo: 20, inscritos: 20 },
    { nombre: 'Desarrollo Web con JS', instructor: 'Ing. María López', cupo: 25, inscritos: 10 },
];




function pintarTabla() {
    //debe de obtener la tabla y rellenarla con los datos de talleres
    const tabla = document.getElementById('tabla-talleres');
    const tbody = tabla.querySelector('tbody');

    tbody.innerHTML = talleres.map(taller =>
        `
        <tr>
            <td>${taller.nombre}</td>
            <td>${taller.instructor}</td>
            <td>${taller.cupo}</td>
            <td>${taller.inscritos}</td>
        </tr>
        `).join('');
}

pintarTabla();

const formArreglos = document.getElementById('form-arreglos');
const resultadoArreglos = document.getElementById('resultado-arreglo');
const selectOperacionArreglo = document.getElementById('operacion-arreglo');

const findCampos = document.getElementById('find-campos');
const InputNombreInstructor = document.getElementById('nombre-instructor');
const errorNombreInstructor = document.getElementById('error-nombreInstructor');

selectOperacionArreglo.addEventListener('change', (evento) => {
    const operacion = selectOperacionArreglo.value;

    if (operacion === 'find') {
        findCampos.style.display = 'block';
    } else {
        findCampos.style.display = 'none';
    }
});

formArreglos.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const operacion = selectOperacionArreglo.value;

    let resultado;

    switch (operacion) {
        case 'forEach':
            let provtalleres = [];
            talleres.forEach((t) => {
                provtalleres.push(`- ${t.nombre} (${t.inscritos}/${t.cupo})`);
            });

            resultado = provtalleres.join('\n'); break;
        case 'map':
            resultado = talleres.map((t) => t.nombre).join('\n');
            break;
        case 'filter':
            resultado = talleres.filter((t) => t.inscritos >= t.cupo).map((t) => t.nombre).join('\n');
            break;
        case 'find':
            const nombreInstructor = InputNombreInstructor.value.trim();
            errorNombreInstructor.textContent = nombreInstructor === '' ? 'Por favor, ingresa el nombre del instructor.' : '';


            const tallerEncontrado = talleres.find((t) => t.instructor === nombreInstructor);
            resultadoArreglos.textContent = !tallerEncontrado ? `No se encontró ningún taller impartido por ${nombreInstructor}.`
                : `Primer taller de ${nombreInstructor}: ${tallerEncontrado.nombre}`;

            break;
    }
    resultadoArreglos.textContent = resultado;
});


//Segundo EJERCICIO 

const formObjeto = document.getElementById('form-objeto');
const resultadoObjeto = document.getElementById('resultado-objeto');

formObjeto.addEventListener('submit', (evento) => {
    evento.preventDefault();

    //construimos el objeto de talleres
    const taller = {
        nombre: document.getElementById('obj-nombre').value,
        instructor: document.getElementById('obj-instructor').value,
        cupo: Number(document.getElementById('obj-cupo').value),
        inscritos: Number(document.getElementById('obj-inscritos').value)
    };

    const operacion = document.getElementById('operacion-objeto').value;

    let resultado;

    switch (operacion) {
        case 'keys':
            resultado = JSON.stringify(Object.keys(taller));
            break;
        case 'values':
            break;
        case 'entries':
            //yo
            resultado = Object.entries(taller).map(([campo, valor]) => `${campo}: ${valor}`).join('\n');
            break;
        case 'stringify':
            break;
        case 'roundtrip':
            //yo
            const textoJson = JSON.stringify(taller, null, 2);
            const objetoDeVuelta = JSON.parse(textoJson);

            resultado = [
                '',
                textoJson,
                '',
                `tipo: ${typeof objetoDeVuelta}`,
                objetoDeVuelta.nombre
            ].join('\n');
            break;
    }

    resultadoObjeto.textContent = resultado;
})

