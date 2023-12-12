import type { NextApiRequest, NextApiResponse } from 'next'
import type { RespostaPadraoMsg } from '../../types/respostaPadrao'
import { conectarMongoDB } from '../../middlewares/conectarMongoDb'
import { findAndUpdateMusic } from '../services/MusicServices'
import { MessagesHelper } from '../../pages/helpers/messageHelpers'

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
        erro: MessagesHelper.IdNotValid
      })
    }
    if (!nome || nome.length < minLength) {
      return res.status(400).json({
        erro: MessagesHelper.NameNotValid
      })
    }
    if (!descricao || descricao.length < maxLength) {
      return res.status(400).json({
        erro: MessagesHelper.DescriptionNotValid
      })
    }
    const UpdatedSong = await findAndUpdateMusic({
      id: _id,
      nome,
      descricao,
      url
    })

    return res.status(200).json({ msg: MessagesHelper.UpdatedSong })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ erro: MessagesHelper.UpdateSongFailed })
  }
}

export default conectarMongoDB(UpdateMusic)
