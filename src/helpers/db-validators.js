import Reservacion from '../reservations/reservations.model';
import Habitacion from '../bedrooms/bedrooms.model';
import Usuario from '../users/users.model';
import Event from "../events/event.js";

export const validarNumeroHabitacionUnico = async (numero) => {
    const habitacionExistente = await Habitacion.findOne({ numero });
    if (habitacionExistente) {
        throw new Error('El número de habitación ya está en uso');
    }
};

export const validarCapacidadHabitacion = (capacidad) => {
    if (capacidad <= 0) {
        throw new Error('La capacidad de la habitación debe ser mayor que cero');
    }
};

export const validarExistenciaHabitacion = async (habitacionId) => {
    const habitacion = await Habitacion.findById(habitacionId);
    if (!habitacion) {
        throw new Error('La habitación no existe');
    }
};

export const validarReservacionesAsociadas = async (habitacionId) => {
    const reservaciones = await Reservacion.find({ habitacion: habitacionId });
    if (reservaciones.length > 0) {
        throw new Error('No se puede eliminar la habitación, tiene reservaciones asociadas');
    }
};

export const validarUsuario = async (usuarioId) => {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
        throw new Error('El usuario no existe');
    }
};

export const existingNameEvent = async(nameEvent = '') => {
    const existingNameEventXD = await Event.findOne({ nameEvent: nameEvent});
    if(existingNameEventXD) {
        throw new Error (`The name event ${nameEvent} does exist in the database`);
    }
}

export {
    validarNumeroHabitacionUnico,
    validarCapacidadHabitacion,
    validarExistenciaHabitacion,
    validarReservacionesAsociadas,
    validarUsuario
};
