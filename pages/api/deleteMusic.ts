import type { NextApiRequest, NextApiResponse } from 'next'
import type { RespostaPadraoMsg } from '../../types/respostaPadrao'
import { conectarMongoDB } from '../../middlewares/conectarMongoDb'
import { findAndDeleteMusic } from '../services/MusicServices'

const DeleteMusic = async (
  req: NextApiRequest,
  res: NextApiResponse<RespostaPadraoMsg>
) => {
  try {
    const { _id, nome } = req?.body

    if (!_id) {
      return res.status(400).json({
        erro: 'ID não encontrado ou inválido.'
      })
    }
    if (!nome) {
      return res.status(400).json({
        erro: 'Nome da música não encontrado.'
      })
    }

    const deletedMusic = await findAndDeleteMusic({ id: _id })
    console.log(deletedMusic)
    return res.status(200).json({ msg: 'Música excluida com sucesso' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ erro: 'ocorreu um erro ao excluir música.' })
  }
}

export default conectarMongoDB(DeleteMusic)
