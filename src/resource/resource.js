import mongoose from "mongoose";

const ResourceSchema = mongoose.Schema({
    nameResource: {
        type: String,
        required: [true, 'The resource need one name']
    },

    amount:{
        type: Number,
        required: [true, 'The resource need one mount']
    },


    versionResource: {
        type: String,
        required: [true, 'The resource needs a version'],
        default: "v1",
        
    },

    price: {
        type: String,
        required: [true, 'The resource needs a price']
    }
})

export default mongoose.model('Resource', ResourceSchema);