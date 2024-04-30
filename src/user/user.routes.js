import { Router } from "express";
import { check } from "express-validator";
import { registerUser, getUser, updateUser, deleteUser } from "./user.controller.js";

const router = Router()

router.post(
    '/register',
    [
        check('email', 'This is not a valid email').isEmail(),
        check('username', 'The username is necesary').not().isEmpty(),
        check('password', 'The password is necesary').not().isEmpty()
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
    ],
    updateUser
)

router.delete(
    "/settings/:id",
    [
        check("id", "This is an invalid id").isMongoId(),
    ],
    deleteUser
)


export default router;