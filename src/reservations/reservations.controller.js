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
};

export const getReservaciones = async (req, res= response) => {
    try {
        const usuarioId = req.usuario.id;

        const reservaciones = await Reservacion.find({ usuario: usuarioId}).populate('habitacion');

        res.status(200).json({reservaciones});
    } catch (error) {
        console.error('Error al obtener las reservaciones:', error);
        res.status(500).json({ error: 'Error al obtener las reservaciones'});
    }
};

export const reservacionesPut = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, usuario, ...resto } = req.body;

        const reservacionExistente = await Reservacion.findById(id);
        if(!reservacionExistente){
            return res.status(404).json({ error: 'Reservación no encontrada' });
        }

        if(reservacionExistente.usuario.toString() !== req.usuario.id){
            return res.status(401).json({ error: 'No tienes permiso para actualizar esta reservación'});
        }

        const reservacionActualizada = await Reservacion.findByIdAndUpdate(id, resto, { new: true });
        
        res.status(200).json({ msg: 'Reservación actualizada exitosamente', reservacion: reservacionActualizada});
    } catch (error) {
        console.error('Error al actualizar la reservación:', error);
        res.status(500).json({ error: 'Error al actualizar la reservación'});
    }
};



