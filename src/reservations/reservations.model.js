import mongoose, { Schema } from 'mongoose';

const ReservacionSchema = mongoose.Schema({
    fechaInicio: {
        type: Date,
        required: [true, 'Start date is required'],
    },
    fechaFin: {
        type: Date,
        required: [true, 'End date is required'],
    },
    habitacion: {
        type: Schema.Types.ObjectId,
        ref: 'Habitacion',
        required: [true, 'Room is required'],
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'User is required'],
    }
});

export default mongoose.model('Reservacion', ReservacionSchema);
