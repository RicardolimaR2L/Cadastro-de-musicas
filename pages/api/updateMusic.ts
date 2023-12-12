import type { NextApiRequest, NextApiResponse } from 'next'
import type { RespostaPadraoMsg } from '../../types/respostaPadrao'
import { conectarMongoDB } from '../../middlewares/conectarMongoDb'
import { findAndUpdateMusic } from '../services/MusicServices'

const minLength = 5
const maxLength = 10
const UpdateMusic = async (
  req: NextApiRequest,
  res: NextApiResponse<RespostaPadraoMsg>
) => {
  try {
    const { _id, nome, descricao, url } = req?.body

    if (!_id) {
      return res.status(400).json({
        erro: 'Id não encontrado'
      })
    }
    if (!nome || nome.length < minLength) {
      return res.status(400).json({
        erro: 'Nome Iválido, o nome precisa ter no mínimo 5 caracteres'
      })
    }
    if (!descricao || descricao.length < maxLength) {
      return res.status(400).json({
        erro: 'descrição Inválida, precisa ter no mínimo 10 caracteres'
      })
    }
    const musicaAtualizada = await findAndUpdateMusic({
      id: _id,
      nome,
      descricao,
      url
    })
    
    return res.status(200).json({ msg: 'música atualizada com sucesso' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ erro: 'ocorreu um erro ao atualizar música' })
  }
}

export default conectarMongoDB(UpdateMusic)
