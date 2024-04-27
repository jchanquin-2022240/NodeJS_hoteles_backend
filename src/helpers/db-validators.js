import Reservacion from '../reservations/reservations.model';
import Habitacion from '../bedrooms/bedrooms.model';
import Usuario from '../users/users.model';

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

export const validarUsuario = async (usuarioId) => {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
        throw new Error('El usuario no existe');
    }
};



export const existeReservacionById = async (id = '') => {
    const existeReservacion = await Reservacion.findById(id);
    if (!existeReservacion){
        throw new Error(`El ID: ${id} No existe`);
    }
}

