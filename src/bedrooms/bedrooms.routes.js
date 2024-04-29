import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

import {
    habitacionPost,
    habitacionGet,
    habitacionPut,
    habitacionDelete
} from './bedrooms.controller.js';

import {
    validarNumeroHabitacionUnico,
    validarCapacidadHabitacion,
    validarExistenciaHabitacion,
    validarReservacionesAsociadas
} from "../helpers/db-validators.js";

const router = Router();

router.get("/", habitacionGet);

router.post("/",
    validarJWT,
    [
        check("numero", "El número de habitación es obligatorio").not().isEmpty(),
        check("numero").custom(validarNumeroHabitacionUnico),
        check("tipo", "El tipo de habitación es obligatorio").not().isEmpty(),
        check("capacidad", "La capacidad de la habitación es obligatoria").not().isEmpty(),
        check("capacidad").custom(validarCapacidadHabitacion),
        check("precio", "El precio de la habitación es obligatorio").not().isEmpty(),
        check("estado", "El estado de la habitación es obligatorio").not().isEmpty(),
        validarCampos
    ],
    habitacionPost
);

router.put("/:id",
    validarJWT,
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(validarExistenciaHabitacion),
        check("numero", "El número de habitación es obligatorio").not().isEmpty(),
        check("numero").custom(validarNumeroHabitacionUnico),
        check("tipo", "El tipo de habitación es obligatorio").not().isEmpty(),
        check("capacidad", "La capacidad de la habitación es obligatoria").not().isEmpty(),
        check("capacidad").custom(validarCapacidadHabitacion),
        check("precio", "El precio de la habitación es obligatorio").not().isEmpty(),
        check("estado", "El estado de la habitación es obligatorio").not().isEmpty(),
        validarCampos
    ],
    habitacionPut
);

router.delete("/:id",
    validarJWT,
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(validarExistenciaHabitacion),
        check("id").custom(validarReservacionesAsociadas),
        validarCampos
    ],
    habitacionDelete
);

export default router;
