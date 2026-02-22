import mongoose from "mongoose"

mongoose.connect("");

const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    publicKey:String,
    privateKey:String
})

export const UserModel = new mongoose.Model("users",UserSchema);

