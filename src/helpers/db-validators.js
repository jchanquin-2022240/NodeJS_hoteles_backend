import { validationResult } from "express-validator";
import Role from '../roles/role.model.js';
import User from '../user/user.model.js'

export const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if (!existeRol){
        throw new Error(`El role ${role} no existe en la base datos`);
    }
}

export const existenteEmail = async (email = '') => {
    const existeEmail = await User.findOne({email});
    if (existeEmail){
        throw new Error(`El email ${email} ya fue registrado`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario){
        throw new Error(`El ID: ${email} No existe`);
    }
}

export const validateFields = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }
    next();
};



