import { Router } from 'express';
import { body, check, param } from 'express-validator';
import {
    crearReservacion,
    getReservaciones,
    reservacionesPut,
    reservacionDelete
} from './reservations.controller.js';

import {
    validarCampos
} from '../middlewares/validar-campos.js';  

import{
    validarCapacidad,
    validarDisponibilidad,
    validarFechar,
    validarNumeroHuespedes,
    validarUsuario
} from '../helpers/db-validators.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post(
    '/',
    [
        validarJWT,
        check
    ],
    validarCampos,
    crearReservacion
);
