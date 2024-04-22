import { Schema, model } from 'mongoose'

const UserSchema = Schema({
    username: {
        type: String,
        required: [true, 'The username is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
    },
    role:{
        type: String,
        enum: ["SYSTEM_ADMIN_ROLE", "ADMIN_ROLE", "USER_ROLE"],
        default: "USER_ROLE"
    },
    reservations: {
        type: [{
            type: Schema.Types.ObjectId, ref: 'Reservation'
        }],
        default: []
    },
    status: {
        type: Boolean,
        default: true
    }
})


export default model('User', UserSchema)