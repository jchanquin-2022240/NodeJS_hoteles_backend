import { Router } from "express";
import { check } from "express-validator";
import { 
    additionalServiceDeletePost, 
    additionalServicesPost, 
    eventDelete, 
    eventPut, 
    eventsGet, 
    eventsPost, 
    getEventForName,
    resourceDelete, 
    resourcesAddPost } from "./event.controller.js";

import { existingNameEvent } from "../helpers/db-validator.js";
import { validationFields } from "../middlewares/validationFields.js";

const router = Router();

router.post(
    "/",
    [
        check("nameEvent", "The event need one name").not().isEmpty(),
        check("nameEvent").custom(existingNameEvent),
        check("descriptionEvent", "The event need one description").not().isEmpty(),
        check("date", "The evenet need one date").not().isEmpty(),
        check("date", "The format is incorrect").not().isDate(),
        check('startTime', 'The format is incorrect').not().isISO8601(),
        check('endingTime', 'The format is incorrect').not().isISO8601(),
        check("typeEvent", "The event need one type").not().isEmpty(),
        validationFields
    ], eventsPost)

router.get("/", eventsGet)

router.delete("/:id", [ check("id", "It is not an id not valid").isMongoId(), validationFields], eventDelete)

router.put("/", [check("nameEventUpdate", "You need the name  of the your event"), validationFields],eventPut) 

router.get("/searching", [check("nameEvent", "You need the name of event for search one"), validationFields], getEventForName)

router.post ("/resourcesAdd", [ check("resource", "The resource is empty").not().isEmpty(), validationFields], resourcesAddPost) 

router.post ("/addiotnalServiceAdd ", [check("additionalServices", "The services is empty").not().isEmpty(), validationFields], additionalServicesPost ) 

router.delete("/deleteAddiotionalService", 
    [
        check("serviceName", "You need the name for the service").not().isEmpty(),
        check("eventId", "You need id for event").not().isEmpty(),
        check("eventId", "It is not a mongo id").isMongoId(),
        validationFields
    ], additionalServiceDeletePost)

router.delete("/deleteResource", 
        [  
           check("resourceId", "You need id for resource").not().isEmpty(),
           check("eventId", "You need id for event").not().isEmpty(),
           check("resourceId", "It is not a mongo id").isMongoId(),
           check("eventId", "It is not a mongo id").isMongoId(),
           validationFields
        ], resourceDelete)

export default router;