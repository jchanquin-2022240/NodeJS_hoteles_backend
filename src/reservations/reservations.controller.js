
import { validationResult } from 'express-validator';
import Reservacion from './reservations.model.js';
import Habitacion from '../bedrooms/bedrooms.model.js';


const calcularPrecioReservacion = async (habitacionId, fechaInicio, fechaFin) => {
    try {
        const habitacion = await Habitacion.findById(habitacionId);
        if (!habitacion) {
            throw new Error('Habitación no encontrada');
        }

        // variables para 
        const diffTiempo = fechaFin.getTime() - fechaInicio.getTime();
        const diffDias = Math.ceil(diffTiempo / (1000 * 60 * 60 * 24));

        // mutli
        const precioTotal = habitacion.precio * diffDias;

        return precioTotal;
    } catch (error) {
        throw new Error('Error al calcular el precio de la reservación: ' + error.message);
    }
};

export const reservacionPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { habitacionId, fechaInicio, fechaFin, huespedes } = req.body;
    /*const usuarioId = req.usuario.id;*/

    try {
        const habitacionExistente = await Habitacion.findOne({_id: habitacionId});
        if (!habitacionExistente) {
            return res.status(404).json({ error: 'Habitación no encontrada' });
        }

        const precioReservacion = await calcularPrecioReservacion(habitacionId, fechaInicio, fechaFin);

        const reservacion = new Reservacion({
            //usuario: usuarioId,
            habitacion: habitacionId,
            fechaInicio,
            fechaFin,
            huespedes,
            estado: 'pendiente',
            pago: precioReservacion
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
