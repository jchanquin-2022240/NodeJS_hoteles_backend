import { Router } from "express";
import { check } from "express-validator";
import {
    createHotel,
    getHotels,
    getHotelsAvailable,
    updateHotel,
    deleteHotel,
    getHotelById
} from "./hotel.controller.js";
import { existsHotel, existsNameHotel, existsLocation, hotelStatus } from "../helpers/db-validators.js";
import upload from './multerConfig.js';
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { esSystemAdmin } from "../middlewares/verificar-role.js";

const router = Router();

router.post(
    "/create",
    upload.single('photo'),
    [
        //validarJWT,
        //esSystemAdmin,
        check("nameHotel", "The name of hotel can not be empty").not().isEmpty(),
        check("nameHotel").custom(existsNameHotel),
        check("description", "The description can not be empty").not().isEmpty(),
        check("installations", "The installations can not be empty").not().isEmpty(),
        check("location", "The location can not be empty").not().isEmpty(),
        check("location").custom(existsLocation),
        validarCampos
    ],
    createHotel
);

router.get(
    "/",
    getHotelsAvailable
);

router.get(
    "/hotels",
    validarJWT,
    getHotels
);

router.get(
    "/:id",
    getHotelById
);

router.put(
    "/update/:id",
    upload.single('photo'),
    [
        //validarJWT,
        //esSystemAdmin,
        check("id", "Invalid hotel ID").isMongoId(),
        check("id").custom(existsHotel),
        check("nameHotel").custom(existsNameHotel),
        check("location").custom(existsLocation),
        validarCampos
    ],
    updateHotel
);

router.delete(
    "/:id",
    [
        //validarJWT,
        //esSystemAdmin,
        check("id", "Invalid hotel ID").isMongoId(),
        check("id").custom(existsHotel),
        check("id").custom(hotelStatus),
        validarCampos
    ],
    deleteHotel
);

export default router;
