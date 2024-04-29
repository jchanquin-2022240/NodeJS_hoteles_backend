import mongoose from "mongoose";

const ResourceSchema = mongoose.Schema({
    nameResource: {
        type: String,
        required: [true, 'The resource need one name']
    },
    staff: {
        type: String,
            required: [true, 'The resource need one staff']
    },
    equipment: {
        type: String,
        required: [true, 'The resource need one equipment']
    },
    catering: {
        type: String,
        required: [true, 'The resource need one catering']
    },
    state : {
        type: Boolean,
        default: true
    }

})

export default mongoose.model('Resource', ResourceSchema)