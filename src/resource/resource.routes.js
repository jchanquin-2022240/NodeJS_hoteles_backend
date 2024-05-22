
import { Router } from "express";
import { check } from 'express-validator';

import {
    resourcePost,
    resourceGet,
    resourcePut,
} from "./resource.controller.js";

import { existingNamePackage } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { esSystemAdmin } from "../middlewares/verificar-role.js";

const router = Router();


//get
router.get("/package", resourceGet);

router.post(
    "/",
    [
        validarJWT,
        esSystemAdmin,
        check("namePackage", "Name package is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        check("price", "Price is required").not().isEmpty().isNumeric(),
        check("namePackage").custom(existingNamePackage),
        validarCampos
    ], resourcePost)

export default router;

//put
router.put(
    "/update/:id",
    [
        validarJWT,
        esSystemAdmin,
        check("id", "Id is required").not().isEmpty(),
        check("id", "Id is not valid").isMongoId(),
        check("namePackage", "Name package is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        check("price", "Price is required").not().isEmpty().isNumeric(),
        validarCampos
    ], resourcePut)

//delete
