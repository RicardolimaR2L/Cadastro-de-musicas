import mongoose, { Schema } from 'mongoose'

const musicasSchema = new Schema({
  nome: { type: String, required: true },
  url: { type: String, required: true },
  descricao: { type: String, required: true }
})

export const MusicasModel =
  mongoose.models.musicas || mongoose.model('musicas', musicasSchema)
