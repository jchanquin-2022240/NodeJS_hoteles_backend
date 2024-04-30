import { Router } from "express";
import { check } from 'express-validator';

import {
    resourcePost,
    resourceGet,
} from "./resource.controller.js";

//import { validateFields } from "../middlewares/validateFields";

const router = Router();


//get
router.get("/package", resourceGet);

router.post(
    "/",
    [
        check("namePackage", "Name package is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        check("price", "Price is required").not().isEmpty().isNumeric(),
        
    ], resourcePost)

export default router;


//put


//delete