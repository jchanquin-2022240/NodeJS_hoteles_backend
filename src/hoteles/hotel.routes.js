import { Router } from "express";
import { check } from "express-validator";
import { createHotel, getHotels, getHotelsAvailable, updateHotel, deleteHotel } from "./hotel.controller.js";
import { existsHotel, existsNameHotel, existsLocation, hotelStatus } from "../middlewares/validateFields.js";
import { validateFields } from "../helpers/db-validator.js";

const router = Router();

router.post(
    "/",
    [
        check("nameHotel", "The name of hotel can not be empty").not().isEmpty(),
        check("nameHotel").custom(existsNameHotel),
        check("description", "The description can not be empty").not().isEmpty(),
        check("installations", "The installations can not be empty").not().isEmpty(),
        check("location", "The location can not be empty").not().isEmpty(),
        check("location").custom(existsLocation),
        validateFields
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

router.put(
    "/:id",
    [
        check("id", "This is an invalid id").isMongoId(),
        check("id").custom(existsHotel),
        check("nameHotel").custom(existsNameHotel),
        check("location").custom(existsLocation),
        validateFields
    ],
    updateHotel
)

router.delete(
    "/:id",
    [
        check("id", "This is an invalid id").isMongoId(),
        check("id").custom(existsHotel),
        check("id").custom(hotelStatus),
        validateFields
    ],
    deleteHotel
)

export default router;