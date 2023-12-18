import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true }
})

export const UserModel =
  mongoose.models.users || mongoose.model('users', userSchema)
