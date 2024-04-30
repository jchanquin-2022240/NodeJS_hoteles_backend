import { Router } from "express";
import { check } from 'express-validator';

import {
    resourcePost,
} from "./resource.controller.js";

import { validateFields } from "../middlewares/validateFields";

const router = Router();


//get

router.post(
    "/",
    [
        check("namePackage", "Name package is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        check("price", "Price is required").not().isEmpty().isNumeric(),
        validateFields,
    ], resourcePost)

export default router;


//put


//delete