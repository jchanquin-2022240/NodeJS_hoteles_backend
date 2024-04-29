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

export const validarFechar = async (fechaInicio, fechaFin) => {
    if(fechaInicio >= fechaFin) {
        throw new Error('La fecha de inicio debe ser anterior a la fecha de fin');
    }
};

export const validarNumeroHuespedes = (huespedes) => {
    if(!Number.isInteger(huespedes) || huespedes <= 0) {
        throw new Error('Número de huéspedes debe ser un número entero positivo');
    }
} 


export const validarCapacidad = async (habitacionId, numeroHuespedes) => {
    const habitacion = await Habitacion.findById(habitacionId);
    if (!habitacion) {
        throw new Error('La habitación no existe');
    }

    if (numeroHuespedes > habitacion.capacidad) {
        throw new Error('El número de huéspedes excede la capacidad de la habitación');
    }
};

export const validarDisponibilidad = async (habitacionId, fechaInicio, fechaFin) => {
    const reservaciones = await Reservacion.find({ 
        habitacion: habitacionId,
        $or: [
            { fechaInicio: { $lte: fechaInicio }, fechaFin: { $gte: fechaInicio } },
            { fechaInicio: { $lte: fechaFin }, fechaFin: { $gte: fechaFin } },
            { fechaInicio: { $gte: fechaInicio }, fechaFin: { $lte: fechaFin } }
        ]
    });

    if (reservaciones.length > 0) {
        throw new Error('La habitación no está disponible para las fechas solicitadas');
    }
};

export const existeReservacionById = async (id = '') => {
    const existeReservacion = await Reservacion.findById(id);
    if (!existeReservacion){
        throw new Error(`El ID: ${id} No existe`);
    }
}

export {
    validarNumeroHabitacionUnico,
    validarCapacidadHabitacion,
    validarExistenciaHabitacion,
    validarReservacionesAsociadas,
    validarUsuario
};