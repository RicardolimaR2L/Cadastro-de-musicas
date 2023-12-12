import type { NextApiRequest, NextApiResponse } from 'next'
import type { RespostaPadraoMsg } from '../../types/respostaPadrao'
import { conectarMongoDB } from '../../middlewares/conectarMongoDb'
import { FindmusicById, findAndDeleteMusic } from '../services/MusicServices'
import { MessagesHelper } from '../../pages/helpers/messageHelpers'

const DeleteMusic = async (
  req: NextApiRequest,
  res: NextApiResponse<RespostaPadraoMsg>
) => {
  try {
    const { _id, nome } = req?.body

    if (!_id) {
      return res.status(400).json({
        erro: MessagesHelper.IdNotValid
      })
    }

    const musicaNoBanco = await FindmusicById({ id: _id })
    if (!musicaNoBanco) {
      return res.status(401).json({ erro: MessagesHelper.SongNotFound })
    }

    if (nome != musicaNoBanco?.nome) {
      return res.status(401).json({ erro: MessagesHelper.NameNotFound })
    }
    if (!nome || nome.length < 5) {
      return res.status(400).json({
        erro: MessagesHelper.NameNotFound
      })
    }
    const deletedMusic = await findAndDeleteMusic({ id: _id, nome: nome })

    return res.status(200).json({ msg: MessagesHelper.DeleteSong })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ erro: MessagesHelper.DeleteSongFailed })
  }
}

export default conectarMongoDB(DeleteMusic)
