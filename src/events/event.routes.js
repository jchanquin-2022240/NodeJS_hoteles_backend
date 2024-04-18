import { Router } from "express";
import { check } from "express-validator";
import { eventDelete, eventsGet, eventsPost } from "./event.controller.js";

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





export default router;