import type { NextApiRequest, NextApiResponse } from 'next'
import type { RespostaPadraoMsg } from '../../types/respostaPadrao'
import { conectarMongoDB } from '../../middlewares/conectarMongoDb'
import { FindAllMusic, FindmusicById } from '../../services/MusicServices'
import { MessagesHelper } from '../../helpers/messageHelpers'

const endpointMusicas = async (
  req: NextApiRequest,
  res: NextApiResponse<RespostaPadraoMsg | any>
) => {
  try {
    if (req?.query?.id) {
      const musicByIdResult = await FindmusicById({
        id: req.query.id.toString()
      })
      if (!musicByIdResult) {
        return res.status(400).json({ erro: MessagesHelper.SongNotFound })
      }
      return res.status(200).json(musicByIdResult)
    } else {
      const allMusicResult = await FindAllMusic(res)
      return res.status(200).json(allMusicResult)
    }
  } catch (e) {
    console.error(e)
    return res.status(400).json({ erro: MessagesHelper.SongsNotFound })
  }
}

export default conectarMongoDB(endpointMusicas)
