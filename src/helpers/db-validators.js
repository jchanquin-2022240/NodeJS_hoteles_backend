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


