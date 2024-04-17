import mongoose from "mongoose";

const EventsSchema = mongoose.Schema({
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
        nameResource: String,
        amount: Number
    }],

    additionalServices: [String],

    state: {
        type: Boolean,
        default: true
    }


})