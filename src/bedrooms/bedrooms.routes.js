import { Router } from "express";
import {
    habitacionDelete,
    habitacionPost,
    habitacionPut,
    habitacionGet,
    getReservacionesByHabitacion
} from "./bedrooms.controller.js";

const router = Router();

router.post("/", habitacionPost);

router.put("/:id", habitacionPut);

router.get("/", habitacionGet);

router.delete("/:id", habitacionDelete);

router.get("/:id/reservaciones", getReservacionesByHabitacion);

export default router;
