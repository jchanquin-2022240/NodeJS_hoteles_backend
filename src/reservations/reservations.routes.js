import { Router } from 'express';
import { body, param } from 'express-validator';
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

const router = Router();

router.post(
    '/',
    [
        
    ],
    validarCampos,
    crearReservacion
);
