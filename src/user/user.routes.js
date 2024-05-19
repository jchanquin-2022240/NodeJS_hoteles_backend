import { Router } from "express";
import { check } from "express-validator";
import { registerUser, getUser, updateUser, deleteUser } from "./user.controller.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { existenteEmail, existenteUsername } from "../helpers/db-validators.js";

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
    getUser
)

router.put(
    "/settings/:id",
    [
        check("id", "This is an invalid id").isMongoId(),
        validarCampos
    ],
    updateUser
)

router.delete(
    "/settings/:id",
    [
        check("id", "This is an invalid id").isMongoId(),
        validarCampos
    ],
    deleteUser
)


export default router;