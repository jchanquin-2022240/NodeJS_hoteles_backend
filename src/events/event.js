import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
    nameEvent: {
        type: String,
        required: [true, 'The event need one name']
    },

    descriptionEvent: {
        type: String,
        required: [true, 'The event need one description']
    },

    date: {
        type: Date,
        required: [true, 'The evenet need one date']
    },

    typeEvent: {
        type: String,
        enum: ['Conference', 'Wedding', 'Meeting', 'Other'],
        required: [true, 'The event need one type']
    },

    resources: [{
        nombre: String,
        cantidad: Number
    }],
    
    additionalServices: [String],

    state: {
        type: Boolean,
        default: true
    }


})

export default mongoose.model('Event', EventSchema)