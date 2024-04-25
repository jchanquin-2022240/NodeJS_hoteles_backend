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
        check("usuario", "User ID is required").not().isEmpty(),
        check("habitacion", "Room ID is required").not().isEmpty(),
        check("fechaInicio", "Start date is required").not().isEmpty(),
        check("fechaFin", "End date is required").not().isEmpty(),
        check("huespedes", "Number of guests is required").not().isEmpty(),
        check("pago", "Payment is required").not().isEmpty(),
        check("fechaInicio").custom(validarFechar),
        check("fechaFin").custom(validarFechar),
        check("huespedes").custom(validarNumeroHuespedes)
    ],
    validarCampos,
    crearReservacion
);
