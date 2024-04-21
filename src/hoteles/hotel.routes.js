import { Router } from "express";
import { check } from "express-validator";
import { createHotel, getHotels, getHotelsAvailable, updateHotel, deleteHotel } from "./hotel.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("nameHotel", "The name of hotel can not be empty").not().isEmpty(),
        check("description", "The description can not be empty").not().isEmpty(),
        check("installations", "The installations can not be empty").not().isEmpty(),
        check("location", "The location can not be empty").not().isEmpty(),
        check("category", "The category can not be empty").not().isEmpty(),
    ],
    createHotel
)

router.get(
    "/",
    getHotels
)

router.get(
    "/hotels",
    getHotelsAvailable
)

export default router;