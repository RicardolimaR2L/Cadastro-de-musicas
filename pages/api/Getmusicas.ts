import type { NextApiRequest, NextApiResponse } from 'next'
import type { RespostaPadraoMsg } from '../../types/respostaPadrao'
import { conectarMongoDB } from '../../middlewares/conectarMongoDb'
import { FindmusicById, FindAllMusic } from '../services/MusicServices'

const endpointMUsicas = async (
  req: NextApiRequest,
  res: NextApiResponse<RespostaPadraoMsg | any>
) => {
  try {
    if (req?.query?.id) {
      const musicByIdResult = await FindmusicById({
        id: req.query.id.toString()
      })
      return res.status(200).json(musicByIdResult)
    } else {
      const allMusicResult = await FindAllMusic()
      return res.status(200).json(allMusicResult)
    }
  } catch (e) {
    console.log('Ocorreu um erro ao pesquisar músicas ', e)
  }
}

export default conectarMongoDB(endpointMUsicas)
