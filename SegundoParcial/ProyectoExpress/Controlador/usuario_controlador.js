const bycrpt = require('bcryptjs');

const usuarioModelo = require('../Modelo/usuarios_modelo');

const {validarCorrero, validaBoleta , validarContrasela } = require('./validaciones');

function esDuplicado(error) {
    return error.code === 'ER_DUP_ENTRY' || error.code === '23505';
}

async function listarUsuarios(req, res) {
    try {
        const usuarios = await usuarioModelo.listar();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({error: error.message });
    }
}

async function obtenerUsuario(req, res){
    try {
        const usuario = await usuarioModelo.buscarPorId(req.params.id);
        if(!usuario) return res.status(404).json({error: 'Usuario no encontrado'});
        res.json(usuario);
    } catch (error) {
        res.status(500).json({error: error.message });
    }
}

/** Deberan de realizar los controladores de asistencia y talleres
 * con sus funciones correspondientes
 */