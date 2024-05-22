import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import {
    habitacionPost,
    habitacionGet,
    habitacionPut,
    habitacionDelete,
    habitacionById
} from './bedrooms.controller.js';
import {
    validarNumeroHabitacionUnico,
    validarExistenciaHabitacion,
    validarReservacionesAsociadas
} from "../helpers/db-validators.js";

import { validarJWT } from '../middlewares/validar-jwt.js';
import { esSystemAdmin } from '../middlewares/verificar-role.js';

const router = Router();

router.get("/", habitacionGet);
router.get("/hotel/:id", habitacionById);

router.post("/", [
    // validarJWT,
    // esSystemAdmin,
    check("numero", "El número de habitación es obligatorio").not().isEmpty(),
    check("numero").custom(validarNumeroHabitacionUnico),
    check("tipo", "El tipo de habitación es obligatorio").not().isEmpty(),
    check("capacidad", "La capacidad de la habitación es obligatoria").not().isEmpty().isNumeric(),
    check("precio", "El precio de la habitación es obligatorio").not().isEmpty().isNumeric(),
    check("idHotel", "El ID del hotel es obligatorio").not().isEmpty(),
    validarCampos
],
habitacionPost);


router.put("/:id", [
    // validarJWT,
    // esSystemAdmin,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(validarExistenciaHabitacion),
    check("numero").custom(validarNumeroHabitacionUnico),
    validarCampos
], 
habitacionPut);


router.delete("/:id", [
    // validarJWT,
    // esSystemAdmin,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(validarExistenciaHabitacion),
    check("id").custom(validarReservacionesAsociadas),
    validarCampos
], 
habitacionDelete);

export default router;