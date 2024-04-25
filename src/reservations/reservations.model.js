import mongoose, { Schema } from 'mongoose';

const ReservacionSchema = mongoose.Schema({
    usuario: {
        type: Schema.Types.objectId,
        ref: 'Usuario',
        required: [true, 'User reference is mandatory'],
    },
    habitacion: {
        type: Schema.Types.objectId,
        ref: 'Habitacion',
        required: [true, 'Room reference is mandatory'],
    },
    fechaInicio: {
        type: Date,
        required: [true, 'Start date is mandatory'],
    },
    fechaFin: { 
        type: Date,
        required: [true, 'End date is mandatory'],
    },
    huespedes: {
        type: Number,
        required: [true, 'Number of guests is required'],
    },
    estado: {
        type: String,
        enum: ['pendiente', 'confirmada','cancelada'],
        default: 'pendiente',
    },
    pago:{
        type: Number,
        required: [true, 'Payment is mandatory'],
    }
});

export default mongoose.model('Reservacion', ReservacionSchema);