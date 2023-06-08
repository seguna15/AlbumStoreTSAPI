import mongoose from "mongoose";

export enum Roles {
    USER = "USER",
    ADMIN = "ADMIN"
}
//User Schema
const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false},
    },
    roles: {
        type: [String],
        enum: Object.keys(Roles),
        default: Roles.USER
    }
})

export const UserModel = mongoose.model('User', UserSchema);