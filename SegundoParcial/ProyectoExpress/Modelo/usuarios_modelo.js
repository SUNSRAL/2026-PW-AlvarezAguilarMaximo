const pool = require('../bd-local');

const COLUMNAS_PUBLICAS = 'id, nombre, correo, boleta, rol';

//consultar a todos

async function listar() {

    const[filas] = await pool.query(`
        SEKECT ${COLUMNAS_PUBLICAS} FROM usuarios ORDER BY id`);
        return filas
    
};

//obtener por id

async function buscarPorId(id) {
    const [filas] = await pool.query(`
        SELECT ${COLUMNAS_PUBLICAS} FROM usuarios WHERE id = ?`, [id]);
    return filas;
};

//REGISTRAR USUARIO

async function crear({nombre, correo, contraseñaHash, boleta, rol}) {
    const [info] = await pool.query(`
        INSERT INTO usuarios (nombre, correo, contraseña, boleta, rol) VALUES (?, ?, ?, ?, ?)`, 
        [nombre, correo, contraseñaHash, boleta, rol || 'alumno']
    );
    return obtenerPorId(info.insertId);
}

//ACTUALIZAR USUARIO
    
async function actualizar(id, {nombre, correo, rol}) {
    const cambios = Object.entries({nombre, correo, rol}).filter(([, valor]) => valor !== undefined);
    if(cambios.length === 0) {
        return obtenerPorId(id);
    }

    const columnas = cambios.map(([columna]) => `${columna} = ?`).join(', ');

    const [info] = await pool.query(`
        UPDATE usuarios SET ${columnas} WHERE id = ?`, [...cambios.map(([, valor]) => valor), id]
    );
    return obtenerPorId(id);
    if(info.affectedRows === 0) return undefinied;
}

//Eliminiar

async function eliminar(id) {
    const [info] = await pool.query(`
        DELETE FROM usuarios WHERE id = ?`, [id]);
    return info.affectedRows > 0;
}

//Buscar por correo hash

async function buscarPorCorreoConHash(correo) {
    const [filas] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    return filas;
}

//Como hacerlo una API//
// SE necesita exportar//

module.exports = {listar, buscarPorId, crear, actualizar, eliminar, buscarPorCorreoConHash};


//TAREA //
/**
 * Deberan de crear los modelos de las tablas talleres y asistencia:
 * 
 * 1- taller tiene registrar como un alumno al taller 
 * 2- Consultar todos los talles
 * 3- Registrar Asistencia de un alumno a un taller ademas de la Consulta de las mismas
 */

async function registrarTaller({nombre, descripcion}) {
    const [info] = await pool.query(`
        INSERT INTO talleres (nombre, descripcion) VALUES (?, ?)`, 
        [nombre, descripcion]
    );
    return obtenerTallerPorId(info.insertId);
}

async function listarrTalleres() {
    const [filas] = await pool.query(`
        SELECT * FROM talleres ORDER BY id`);
    return filas;
}

async function registrarAsistencia({alumnoId, tallerId}) {
    const [info] = await pool.query(`
        INSERT INTO asistencia (alumno_id, taller_id) VALUES (?, ?)`, 
        [alumnoId, tallerId]
    );
    return obtenerAsistenciaPorId(info.insertId);
}

async function listarAsistencias() {
    const [filas] = await pool.query(`
        SELECT * FROM asistencia ORDER BY id`);
    return filas;
}
