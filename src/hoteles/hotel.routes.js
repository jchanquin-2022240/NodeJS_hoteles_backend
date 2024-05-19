import { Router } from "express";
import { check } from "express-validator";
import {
    createHotel,
    getHotels,
    getHotelsAvailable,
    updateHotel,
    deleteHotel,
    addBedroom,
    removeBedroom
} from "./hotel.controller.js";
import { existsHotel, existsNameHotel, existsLocation, hotelStatus } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { esSystemAdmin, esAdmin} from "../middlewares/verificar-role.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        esSystemAdmin,
        check("nameHotel", "The name of hotel can not be empty").not().isEmpty(),
        check("nameHotel").custom(existsNameHotel),
        check("description", "The description can not be empty").not().isEmpty(),
        check("installations", "The installations can not be empty").not().isEmpty(),
        check("location", "The location can not be empty").not().isEmpty(),
        check("location").custom(existsLocation),
        validarCampos
    ],
    createHotel
)

router.post(
    "/:idHotel/bedroom",
    [
        validarJWT,
        esSystemAdmin,
        check("idHotel", "Invalid hotel ID").isMongoId(),
        check("idBedroom", "Invalid bedroom ID").isMongoId(),
        validarCampos
    ],
    addBedroom
)

router.delete(
    "/:idHotel/bedroom",
    [
        validarJWT,
        esSystemAdmin,
        check("idHotel", "Invalid hotel ID").isMongoId(),
        check("idBedroom", "Invalid bedroom ID").isMongoId(),
        validarCampos
    ],
    removeBedroom
)

router.get(
    "/",
    validarJWT,
    esSystemAdmin,
    esAdmin,
    getHotels
)

router.get(
    "/hotels",
    validarJWT,
    esAdmin,
    getHotelsAvailable
)

router.put(
    "/:id",
    [
        validarJWT,
        esSystemAdmin,
        check("id", "Invalid hotel ID").isMongoId(),
        check("id").custom(existsHotel),
        check("nameHotel").custom(existsNameHotel),
        check("location").custom(existsLocation),
        validarCampos
    ],
    updateHotel
)

router.delete(
    "/:id",
    [
        validarJWT,
        esSystemAdmin,
        check("id", "Invalid hotel ID").isMongoId(),
        check("id").custom(existsHotel),
        check("id").custom(hotelStatus),
        validarCampos
    ],
    deleteHotel
)

export default router;