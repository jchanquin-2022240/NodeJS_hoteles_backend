import Reservacion from '../reservations/reservations.model';
import Habitacion from '../bedrooms/bedrooms.model';
import Usuario from '../users/users.model';

export const validarFechar = async (fechaInicio, fechaFin) => {
    if(fechaInicio >= fechaFin) {
        throw new Error('La fecha de inicio debe ser anterior a la fecha de fin');
    }
};

export const validarNumeroHuespedes = async 