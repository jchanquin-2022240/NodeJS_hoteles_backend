import { response } from "express";
import Reservacion from "./reservations.model.js";
import Habitacion from "../bedrooms/bedrooms.model.js";

export const reservacionPost = async (req, res = response) => {
    try {
        const { habitacion, fechaInicio, fechaFin, ...resto } = req.body;

        const habitacionExistente = await Habitacion.findById(habitacion);

        if (!habitacionExistente) {
            return res.status(404).json({ error: 'Room not found' });
        }

        const reservacion = new Reservacion({ habitacion, fechaInicio, fechaFin, ...resto });

        await reservacion.save();

        res.status(200).json({
            reservacion
        });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const reservacionPut = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, ...resto } = req.body;

        const reservacionActualizada = await Reservacion.findByIdAndUpdate(id, resto);

        res.status(200).json({
            msg: 'The reservation was updated successfully.',
            reservacion: reservacionActualizada
        });
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const reservacionDelete = async (req, res = response) => {
    try {
        const { id } = req.params;
        
        const reservacionToDelete = await Reservacion.findById(id);

        if (!reservacionToDelete) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        await Reservacion.findByIdAndDelete(id);

        res.status(200).json({
            msg: 'The reservation was successfully deleted.',
            reservacion: reservacionToDelete
        });
    } catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const reservacionGet = async (req, res = response) => {
    try {
        const reservacion = await Reservacion.find();

        res.json({
            reservacion
        });
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getHabitacionByReservacion = async (req, res = response) => {
    try {
        const reservacionId = req.params.id;

        const reservacion = await Reservacion.findById(reservacionId).populate('habitacion');

        if (!reservacion) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        const { habitacion } = reservacion;

        res.status(200).json({
            reservacion,
            habitacion
        });
    } catch (error) {
        console.error('Error fetching room by reservation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
