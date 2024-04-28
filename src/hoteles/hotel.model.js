import { model, Schema } from 'mongoose';

const HotelSchema = Schema({
    nameHotel: {
        type: String,
        required: [true, 'The name hotel is required'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'A description is required'],
    },
    installations: {
        type: String,
        required: [true, 'The installations is required'],
    },
    location: {
        type: String,
        required: [true, 'The location is required'],
        unique: true
    },
    category: {
        type: String,
        enum: ["⭐", "⭐⭐","⭐⭐⭐","⭐⭐⭐⭐","⭐⭐⭐⭐⭐"],
        default: "⭐"
    },
    bedrooms: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Bedroom'
        }],
        default: []
    },
    status: {
        type: Boolean,
        default: true,
    }
});

export default model('Hotel', HotelSchema);