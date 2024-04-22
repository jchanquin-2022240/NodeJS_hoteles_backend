import { Router } from "express";
import { check } from "express-validator";
import { eventDelete, eventPut, eventsGet, eventsPost, getEventForName } from "./event.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("nameEvent", "The event need one name").not().isEmpty(),
        check("descriptionEvent", "The event need one description").not().isEmpty(),
        check("date", "The evenet need one date").not().isEmpty(),
        check("typeEvent", "The event need one type").not().isEmpty(),
    ], eventsPost)

router.get("/", eventsGet)

router.delete("/:id", [ check("id", "It is not an id not valid").isMongoId()], eventDelete)

router.put("/", [check("nameEventUpdate", "You need the name  of the your event")],eventPut)

router.get("/searching", [check("nameEvent", "You need the name of event for search one")], getEventForName)

export default router;