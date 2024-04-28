import { Router } from "express";
import { check } from "express-validator";
import { additionalServiceDeletePost, additionalServicesPost, eventDelete, eventPut, eventsGet, eventsPost, getEventForName, resourceDelete, resourcesAddPost } from "./event.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("nameEvent", "The event need one name").not().isEmpty(),
        check("descriptionEvent", "The event need one description").not().isEmpty(),
        check("date", "The evenet need one date").not().isEmpty(),
        check("date", "The date need format").isDate(),
        check("typeEvent", "The event need one type").not().isEmpty(),
    ], eventsPost)

router.get("/", eventsGet)

router.delete("/:id", [ check("id", "It is not an id not valid").isMongoId()], eventDelete)

router.put("/", [check("nameEventUpdate", "You need the name  of the your event")],eventPut) 

router.get("/searching", [check("nameEvent", "You need the name of event for search one")], getEventForName)

router.post ("/resourcesAdd", [], resourcesAddPost) 

router.post ("/addiotnalServiceAdd ", [],additionalServicesPost ) 

router.delete("/deleteAddiotionalService", 
    [
        check("serviceName", "You need the name for the service").not().isEmpty(),
        check("eventId", "You need id for event").not().isEmpty(),
        check("eventId", "It is not a mongo id").isMongoId(),
    ], additionalServiceDeletePost)

router.delete("/deleteResource", 
        [  
           check("resourceId", "You need id for resource").not().isEmpty(),
           check("eventId", "You need id for event").not().isEmpty(),
           check("resourceId", "It is not a mongo id").isMongoId(),
           check("eventId", "It is not a mongo id").isMongoId(),
        ], resourceDelete)

export default router;