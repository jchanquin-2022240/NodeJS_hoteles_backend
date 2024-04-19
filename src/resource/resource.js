import mongoose from "mongoose";

const ResourceSchema = mongoose.Schema({
    nameResource: {
        type: String,
        required: [true, 'The resource need one name']
    },

    amount:{
        type: Number,
        required: [true, 'The resource need one mount']
    }

})

export default mongoose.model('Resource', ResourceSchema)