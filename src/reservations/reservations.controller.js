import { validationResult } from 'express-validator';
import Reservacion from './reservations.model.js';
import Habitacion from '../bedrooms/bedrooms.model.js';

const calcularPrecioReservacion = async (habitacionId, fechaInicio, fechaFin) => {
    try {
        const habitacion = await Habitacion.findById(habitacionId);
        if (!habitacion) {
            throw new Error('Habitación no encontrada');
        }

        const diffTiempo = fechaFin.getTime() - fechaInicio.getTime();
        const diffDias = Math.ceil(diffTiempo / (1000 * 60 * 60 * 24));

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

    try {
        const habitacionExistente = await Habitacion.findOne({ _id: habitacionId });
        if (!habitacionExistente) {
            return res.status(404).json({ error: 'Habitación no encontrada' });
        }

        const fechaInicioDate = new Date(fechaInicio);
        const fechaFinDate = new Date(fechaFin);

        const precioReservacion = await calcularPrecioReservacion(habitacionId, fechaInicioDate, fechaFinDate);

        const reservacion = new Reservacion({
            habitacion: habitacionId,
            fechaInicio: fechaInicioDate,
            fechaFin: fechaFinDate,
            huespedes,
            estado: 'pendiente',
            pago: precioReservacion
        });

        await reservacion.save();

        // Agregar el ID de la reserva al arreglo de reservaciones de la habitación
        habitacionExistente.reservaciones.push(reservacion._id);
        await habitacionExistente.save();

        res.status(201).json({ mensaje: 'Reservación creada exitosamente', reservacion });
    } catch (error) {
        console.error('Error al crear la reservación:', error);
        res.status(500).json({ error: 'Error al crear la reservación' });
    }
};

export const getReservaciones = async (req, res) => {
    try {
        const reservaciones = await Reservacion.find().populate('habitacion');

        res.status(200).json({ reservaciones });
    } catch (error) {
        console.error('Error al obtener las reservaciones:', error);
        res.status(500).json({ error: 'Error al obtener las reservaciones' });
    }
};

export const reservacionPut = async (req, res) => {
    const { id } = req.params;

    try {
        const reservacionExistente = await Reservacion.findById(id);
        if (!reservacionExistente) {
            return res.status(404).json({ error: 'Reservación no encontrada' });
        }

        const { _id, ...resto } = req.body;
        const reservacionActualizada = await Reservacion.findByIdAndUpdate(id, resto, { new: true });

        res.status(200).json({ mensaje: 'Reservación actualizada exitosamente', reservacion: reservacionActualizada });
    } catch (error) {
        console.error('Error al actualizar la reservación:', error);
        res.status(500).json({ error: 'Error al actualizar la reservación' });
    }
};

export const reservacionDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const reservacionExistente = await Reservacion.findById(id);
        if (!reservacionExistente) {
            return res.status(404).json({ error: 'Reservación no encontrada' });
        }

        await Reservacion.findByIdAndDelete(id);

        res.status(200).json({ mensaje: 'Reservación eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la reservación:', error);
        res.status(500).json({ error: 'Error al eliminar la reservación' });
    }
};

export const reservacionesById = async (req, res) => {
    try {
        const { id } = req.params;
        const total = await Reservacion.countDocuments({ habitacion: id });
        const reservaciones = await Reservacion.find({ habitacion: id });

        if (reservaciones.length === 0) {
            return res.status(404).json({ error: 'No se encontraron reservaciones para esta habitación' });
        }

        res.status(200).json({
            total,
            reservaciones
        });
    } catch (error) {
        console.error('Error al obtener reservaciones por ID de habitación:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

/*
export const habitacionById = async (req, res) => {
    try {
        const { id } = req.params;
        const total = await Habitacion.countDocuments({ hotel: id });
        // Buscar todas las habitaciones que pertenezcan al hotel con el ID proporcionado
        const habitaciones = await Habitacion.find({ hotel: id });

        if (habitaciones.length === 0) {
            return res.status(404).json({ error: 'No se encontraron habitaciones para este hotel' });
        }

        res.status(200).json({
            total,
            habitaciones
        });
    } catch (error) {
        console.error('Error fetching habitaciones by hotel ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


*/