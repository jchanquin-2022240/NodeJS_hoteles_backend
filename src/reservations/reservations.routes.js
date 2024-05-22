import { Router } from 'express';
import { check } from 'express-validator';
import {
    reservacionPost,
    getReservaciones,
    reservacionPut,
    reservacionDelete,
    reservacionesById
} from './reservations.controller.js';

import {
    validarFechar,
    validarNumeroHuespedes,
    validarCapacidad,
    validarDisponibilidad,
    existeReservacionById,
    
} from "../helpers/db-validators.js";

import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { esAdmin, esUser } from '../middlewares/verificar-role.js';

const router = Router();

router.get("/", /*validarJWT, esAdmin, */getReservaciones);
router.get("/habitacion/:id", reservacionesById);

router.post(
    "/",
    [
        /*validarJWT,
        esUser,*/
        check("habitacionId", "El ID de la habitación es obligatorio").not().isEmpty(),
        check("habitacionId").custom(validarCapacidad),
        check("fechaInicio", "La fecha de inicio es obligatoria").not().isEmpty(),
        check("fechaFin", "La fecha de fin es obligatoria").not().isEmpty(),
        check("fechaInicio", "La fecha de inicio debe ser anterior a la fecha de fin").custom((value, { req }) => {
            return validarFechar(req.body.fechaInicio, req.body.fechaFin);
        }),
        check("huespedes", "El número de huéspedes es obligatorio").not().isEmpty(),
        //check("huespedes", "Número de huéspedes debe ser un número entero positivo").not().isInt({ min: 1 }),
        //check("huespedes").custom(validarNumeroHuespedes),
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
        esAdmin,
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
        esAdmin,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeReservacionById),
        validarCampos
    ],
    reservacionPut
)

export default router;