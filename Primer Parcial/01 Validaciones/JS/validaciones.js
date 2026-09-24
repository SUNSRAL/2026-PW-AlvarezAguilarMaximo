/*
  Validaciones para el formulario mediante Expresiones Regulares:
  1. Nombre: Letras, acentos, espacios (entre 2 y 60 caracteres).
  2. Boleta: Exactamente 10 dígitos numéricos.
  3. Fecha: Formato estricto DD/MM/AAAA.
*/

const patrones = {
    nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{2,60}$/,

    boleta: /^\d{10}$/,
    // Formato DD/MM/AAAA con días (01-31), meses (01-12) y años de 4 dígitos
    fecha: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
};

const mensajes = {
    nombre: "Solo letras y espacios entre 2 y 60 caracteres.",
    boleta: "La boleta debe tener exactamente 10 dígitos numéricos.",
    fecha: "La fecha debe tener el formato DD/MM/AAAA."
};

function validarCampo(campo, valor) {
    return patrones[campo].test(valor.trim());
}

if (typeof document !== 'undefined') {
    const formulario = document.getElementById('form-registro');

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault(); // Evita el envío automático

        let formularioValido = true;

        for (const campo of Object.keys(patrones)) {
            const input = document.getElementById(campo);
            // Uso de comillas invertidas (template literal) con ${campo}
            const errorSpan = document.getElementById(`error-${campo}`);

            const esValido = validarCampo(campo, input.value);

            input.classList.toggle('invalido', !esValido);
            
            if (errorSpan) {
                errorSpan.textContent = esValido ? '' : mensajes[campo];
            }

            if (!esValido) {
                formularioValido = false;
            }
        }

        // El mensaje de éxito se evalúa fuera del bucle for
        const mensajeExito = document.getElementById('mensaje-exito');
        if (mensajeExito) {
            mensajeExito.textContent = formularioValido ? '¡Registro exitoso!' : '';
        }
    });
}