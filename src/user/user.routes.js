import { Router } from "express";
import { check } from "express-validator";
import { registerUser, getUser, updateUser, deleteUser } from "./user.controller.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { existenteEmail, existenteUsername } from "../helpers/db-validators.js";
import { esUser, esAdminOrSystemAdmin } from "../middlewares/verificar-role.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router()

router.post(
    '/register',
    [
        check('email', 'This is not a valid email').isEmail(),
        check('username', 'The username is necesary').not().isEmpty(),
        check('password', 'The password is necesary').not().isEmpty(),
        check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
        check('username').custom(existenteUsername),
        check('email').custom(existenteEmail),
        validarCampos
    ],
    registerUser
)

router.get(
    '/',
    validarJWT,
    esAdminOrSystemAdmin,
    getUser
)

router.put(
    "/settings/:id",
    [
        validarJWT,
        esUser,
        check("id", "This is an invalid id").isMongoId(),
        validarCampos
    ],
    updateUser
)

router.delete(
    "/settings/:id",
    [
        validarJWT,
        esUser,
        check("id", "This is an invalid id").isMongoId(),
        validarCampos
    ],
    deleteUser
)


export default router;