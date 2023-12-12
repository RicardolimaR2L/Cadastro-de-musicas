import { MusicasModel } from '../../models/musicaSchema'
import type { NextApiResponse } from 'next'
import type { RespostaPadraoMsg } from '../../types/respostaPadrao'
import { MessagesHelper } from '../helpers/messageHelpers'

type MusicParams = {
  id: string
  nome?: string
  descricao?: string
  url?: string
}

export const FindmusicById = async ({ id }: MusicParams) => {
  const musicasEncontradas = await MusicasModel.findById(id)
  if (!musicasEncontradas || musicasEncontradas === null) {
    return
  }

  return {
    nome: musicasEncontradas.nome,
    url: musicasEncontradas.url,
    _id: musicasEncontradas._id,
    descricao: musicasEncontradas.descricao
  }
}

export const FindAllMusic = async (
  res: NextApiResponse<RespostaPadraoMsg | any>
) => {
  const musicasEncontradas = await MusicasModel.find()
  if (!musicasEncontradas || musicasEncontradas.length === 0) {
    return res.status(400).json({ erro: MessagesHelper.SongNotFound })
  }
  return musicasEncontradas
}

export const findAndUpdateMusic = async ({
  id,
  nome,
  descricao,
  url
}: MusicParams) => {
  const musicasEncontrada = await MusicasModel.findByIdAndUpdate(
    id,
    { nome, descricao, url },
    { new: true }
  )
  return musicasEncontrada
}

export const findAndDeleteMusic = async ({ id, nome }: MusicParams) => {
  const musicaEncontrada = await MusicasModel.findOne({ _id: id, nome })
  if (!musicaEncontrada || musicaEncontrada === null) {
    return null
  }
  const musicaDeletada = await MusicasModel.findByIdAndDelete(id)
  if (musicaDeletada.nome.length < 5) {
    return null
  }
  if (!musicaDeletada) {
    return null
  }
  return musicaDeletada
}
