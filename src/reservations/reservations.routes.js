import { Router } from "express";
import {
    reservacionDelete,
    reservacionPost,
    reservacionPut,
    reservacionGet,
    getHabitacionByReservacion
} from "./reservations.controller.js";

const router = Router();

router.post("/", reservacionPost);

router.put("/:id", reservacionPut);

router.get("/", reservacionGet);

router.delete("/:id", reservacionDelete);

router.get("/:id/habitacion", getHabitacionByReservacion);

export default router;
