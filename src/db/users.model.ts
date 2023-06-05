import mongoose from "mongoose";

//User Schema
const UserSchema = new mongoose.Schema({
    email: {tpye: String, required: true},
    username: {type: String, required: true},
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false},
    },
})

export const UserModel = mongoose.model('User', UserSchema);