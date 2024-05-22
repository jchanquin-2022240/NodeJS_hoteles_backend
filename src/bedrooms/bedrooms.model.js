import mongoose, { Schema } from 'mongoose';

const HabitacionSchema = mongoose.Schema({
    numero: {
        type: String,
        required: [true, 'The number is required'],
    },
    tipo: {
        type: String,
        enum: ['individual', 'doble', 'suite'],
        required: [true, 'Room type is mandatory'],
    },
    capacidad: {
        type: Number,
        required: [true, 'Capacity is required'],
    },
    precio: {
        type: Number,
        required: [true, 'Price is required'],
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    reservaciones: [{
        type: Schema.Types.ObjectId,
        ref: 'Reservacion',
        required: [true, 'Reservations are mandatory'],
    }],
    estado: {
        type: Boolean,
        default: true,
    }
});

export default mongoose.model('Habitacion', HabitacionSchema);