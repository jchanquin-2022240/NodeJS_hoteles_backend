import { response } from "express";
import Reservacion from "./reservations.model.js";
import Habitacion from "../bedrooms/bedrooms.model.js"
import Usuario from "../users/users.model.js";

export const crearReservacion = async (req, res = response) => {
    try {
        const { habitacionId, fechaInicio, fechaFin, huespedes, pago} = req.body;

        const habitacionExistente = await Habitacion.findById(habitacionId);
        if(!habitacionExistente){
            return res.status(404).json({ error: 'Habitacion no encontrada' });
        }

        const usuarioId = req.usuario.id;
        if (!usuarioId){
            return res.status(401).json({ error: 'Usuario no autenticado'});
        }

        const reservacion = new Reservacion({
            usuario: usuarioId,
            Habitacion: habitacionId,
            fechaInicio,
            fechaFin,
            huespedes,
            pago
        });
        await reservacion.save();

        res.status(201).json({ msg: 'Reservación creada exitosamente', reservacion});
    } catch (error) {
        console.error('Error al crear la reservación:', error);
        res.status(500).json({ error: 'Error al crear la reservación'});
    }
}