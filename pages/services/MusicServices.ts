import { MusicasModel } from '../../models/musicaSchema'
import type { NextApiResponse } from 'next'
import type { RespostaPadraoMsg } from '../../types/respostaPadrao'

type MusicParameter = {
  id: string
}

export const FindmusicById = async ({ id }: MusicParameter) => {
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
    return res.status(400).json({ erro: 'Música não encontrada' })
  }
  return musicasEncontradas
}
