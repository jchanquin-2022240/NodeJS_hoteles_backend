
import { Router } from "express";
import { check } from "express-validator";
import {
    eventDelete,
    eventPut,
    eventsGet,
    eventsPost,
    getEventForName,
    resourceDelete,
    resourcesAddPost
} from "./event.controller.js";

import { existingNameEvent } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
        check("nameEvent", "The event need one name").not().isEmpty(),
        check("nameEvent").custom(existingNameEvent),
        check("descriptionEvent", "The event need one description").not().isEmpty(),
        check("date", "The evenet need one date").not().isEmpty(),
        check("date", "The format is incorrect").not().isDate(),
        check('startTime', 'Invalid start time format').matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/),
        check('endingTime', 'Invalid ending time format').matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/),
        check("typeEvent", "The event need one type").not().isEmpty(),
        validarCampos
    ], eventsPost)

router.get("/", eventsGet)

router.delete("/:id", [check("id", "It is not an id not valid").isMongoId(), validarCampos], eventDelete)

router.put("/:id",
    [
        check("nameEvent").custom(existingNameEvent),
        check('startTime', 'Invalid start time format').matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/),
        check('endingTime', 'Invalid ending time format').matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/),
        check("id", "It is not a mongo id").isMongoId(),
        validarCampos], eventPut)

router.get("/searching", [check("nameEvent", "You need the name of event for search one"), validarCampos], getEventForName)

router.post("/resourcesAdd/:id", [check("id", "It is not a mongo id").isMongoId(),], resourcesAddPost)

router.post("/deleteResource/:id",
    [
        check("resourceId", "You need id for resource").not().isEmpty(),
        check("id", "You need id for event").not().isEmpty(),
        check("resourceId", "It is not a mongo id").isMongoId(),
        check("id", "It is not a mongo id").isMongoId(),
        validarCampos
    ], resourceDelete)

export default router;
