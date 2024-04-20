import { response } from "express";
import Habitacion from './habitacion.model.js';
import Reservacion from '../reservaciones/reservacion.model.js';


export const habitacionPost = async (req, res) => {
    try {
        const { numero, tipo, capacidad, precio, estado } = req.body;
        const habitacion = new Habitacion({ numero, tipo, capacidad, precio, estado });

        await habitacion.save();

        res.status(200).json({
            msg: '¡Habitación creada exitosamente!',
            habitacion
        });
    } catch (error) {
        console.error('Error creating habitacion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const habitacionPut = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...resto } = req.body;

        const habitacionActualizada = await Habitacion.findByIdAndUpdate(id, resto);

        res.status(200).json({
            msg: '¡Habitación actualizada exitosamente!',
            habitacion: habitacionActualizada
        });
    } catch (error) {
        console.error('Error updating habitacion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const habitacionDelete = async (req, res) => {
    try {
        const { id } = req.params;

        const habitacionToDelete = await Habitacion.findById(id);

        if (!habitacionToDelete) {
            return res.status(404).json({ error: 'Habitacion not found' });
        }

        const reservaciones = await Reservacion.find({ habitacion: id });

        if (reservaciones.length > 0) {
            return res.status(400).json({ error: 'No se puede eliminar la habitación, tiene reservaciones asociadas' });
        }

        await Habitacion.findByIdAndDelete(id);

        res.status(200).json({
            msg: '¡Habitación eliminada exitosamente!',
            habitacion: habitacionToDelete
        });
    } catch (error) {
        console.error('Error deleting habitacion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const habitacionGet = async (req, res) => {
    try {
        const habitaciones = await Habitacion.find();

        res.status(200).json({
            habitaciones
        });
    } catch (error) {
        console.error('Error fetching habitaciones:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
