/**
 * TAREAS:
 * 
 * 2 o 3 funciones para validar
 */

function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

function validarBoleta(boleta) {
    const regex = /^\d{10}$/;
    return regex.test(boleta);
}

function validarContrasena(contrasena) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(contrasena);
}

function validarContraseña2(){

}

module.exports = {validarCorreo, validarBoleta, validarContrasena};