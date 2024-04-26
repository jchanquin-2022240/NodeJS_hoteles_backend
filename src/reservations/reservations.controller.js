import { validationResult } from 'express-validator';
import Reservacion from './reservations.model.js';
import Habitacion from '../bedrooms/bedrooms.model.js';

export const reservacionPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { habitacionId, fechaInicio, fechaFin, huespedes, pago } = req.body;
    const usuarioId = req.usuario.id;

    try {
        const habitacionExistente = await Habitacion.findById(habitacionId);
        if (!habitacionExistente) {
            return res.status(404).json({ error: 'Habitación no encontrada' });
        }

        const reservacion = new Reservacion({
            usuario: usuarioId,
            habitacion: habitacionId,
            fechaInicio,
            fechaFin,
            huespedes,
            estado: 'pendiente', // Estado por defecto
            pago
        });

        await reservacion.save();

        res.status(201).json({ mensaje: 'Reservación creada exitosamente', reservacion });
    } catch (error) {
        console.error('Error al crear la reservación:', error);
        res.status(500).json({ error: 'Error al crear la reservación' });
    }
};

export const getReservaciones = async (req, res) => {
    const usuarioId = req.usuario.id;

    try {
        const reservaciones = await Reservacion.find({ usuario: usuarioId }).populate('habitacion');

        res.status(200).json({ reservaciones });
    } catch (error) {
        console.error('Error al obtener las reservaciones:', error);
        res.status(500).json({ error: 'Error al obtener las reservaciones' });
    }
};

export const reservacionPut = async (req, res) => {
    const { id } = req.params;
    const usuarioId = req.usuario.id;

    try {
        const reservacionExistente = await Reservacion.findById(id);
        if (!reservacionExistente) {
            return res.status(404).json({ error: 'Reservación no encontrada' });
        }

        if (reservacionExistente.usuario.toString() !== usuarioId) {
            return res.status(401).json({ error: 'No tienes permiso para actualizar esta reservación' });
        }

        const { _id, usuario, ...resto } = req.body;
        const reservacionActualizada = await Reservacion.findByIdAndUpdate(id, resto, { new: true });

        res.status(200).json({ mensaje: 'Reservación actualizada exitosamente', reservacion: reservacionActualizada });
    } catch (error) {
        console.error('Error al actualizar la reservación:', error);
        res.status(500).json({ error: 'Error al actualizar la reservación' });
    }
};

export const reservacionDelete = async (req, res) => {
    const { id } = req.params;
    const usuarioId = req.usuario.id;

    try {
        const reservacionExistente = await Reservacion.findById(id);
        if (!reservacionExistente) {
            return res.status(404).json({ error: 'Reservación no encontrada' });
        }

        if (reservacionExistente.usuario.toString() !== usuarioId) {
            return res.status(401).json({ error: 'No tienes permiso para eliminar esta reservación' });
        }

        await Reservacion.findByIdAndDelete(id);

        res.status(200).json({ mensaje: 'Reservación eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la reservación:', error);
        res.status(500).json({ error: 'Error al eliminar la reservación' });
    }
};


