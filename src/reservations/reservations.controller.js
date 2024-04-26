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