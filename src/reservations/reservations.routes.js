import { Router } from 'express';
import { check } from 'express-validator';
import {
    reservacionPost,
    getReservaciones,
    reservacionPut,
    reservacionDelete
} from './reservations.controller.js';

import {
    validarFechar,
    validarNumeroHuespedes,
    validarCapacidad,
    validarDisponibilidad
} from "../helpers/db-validators.js";

import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';


const router = Router();    

router.get("/",getReservaciones);

router.post(
    "/",
    [
        validarJWT,
        check("habitacionId", "El ID de la habitación es obligatorio").not().isEmpty(),
        check("habitacionId").custom(validarCapacidad),
        check("fechaInicio", "La fecha de inicio es obligatoria").not().isEmpty(),
        check("fechaFin", "La fecha de fin es obligatoria").not().isEmpty(),
        check("fechaInicio", "La fecha de inicio debe ser anterior a la fecha de fin").custom((value, { req }) => {
            return validarFechar(req.body.fechaInicio, req.body.fechaFin);
        }),
        check("huespedes", "El número de huéspedes es obligatorio").not().isEmpty(),
        check("huespedes", "Número de huéspedes debe ser un número entero positivo").isInt({ min: 1 }),
        check("huespedes").custom(validarNumeroHuespedes),
        check(["habitacionId", "fechaInicio", "fechaFin"]).custom(async (value, { req }) => {
            const { habitacionId, fechaInicio, fechaFin } = req.body;
            return validarDisponibilidad(habitacionId, fechaInicio, fechaFin);
        }),
        validarCampos
    ],
    reservacionPost
);


router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeReservacionById),
        validarCampos
    ],
    reservacionDelete
);

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeReservacionById),
        validarCampos
    ]
)
