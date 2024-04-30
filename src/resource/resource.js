import mongoose from "mongoose";

const ResourceSchema = mongoose.Schema({
    namePackage: {
        type: String,
        required: [true, 'The resource need one name']
    },
    description: {
        type: String,
            required: [true, 'The resource need one description']
    },
    price: {
        type: Number,
        required: [true, 'The resource need one price']
    },
    state : {
        type: Boolean,
        default: true
    }

})

export default mongoose.model('Resource', ResourceSchema);