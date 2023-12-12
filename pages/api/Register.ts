import type { NextApiRequest, NextApiResponse } from 'next'
import type { RespostaPadraoMsg } from '../../types/respostaPadrao'
import { CadastroMusica } from '../../types/cadastroMusica'
import { conectarMongoDB } from '../../middlewares/conectarMongoDb'
import { MusicasModel } from '../../models/musicaSchema'
import { MessagesHelper } from '../../pages/helpers/messageHelpers'

const endpointCadastro = async (
  req: NextApiRequest,
  res: NextApiResponse<RespostaPadraoMsg>
) => {
  try {
    const musica = req.body as CadastroMusica
    const minLength = 5
    const maxLength = 10
    const urlRegex =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

    if (!musica?.nome || musica.nome.length < minLength) {
      return res.status(401).json({
        erro: MessagesHelper.NameNotValid
      })
    }
    if (!musica?.url || !urlRegex.test(musica.url)) {
      return res.status(401).json({ erro: MessagesHelper.UrlNotValid })
    }
    if (!musica?.descricao || musica.descricao.length < maxLength) {
      return res.status(401).json({
        erro: MessagesHelper.DescriptionNotValid
      })
    }
    const ObjectSong = {
      nome: musica.nome,
      url: musica.url,
      descricao: musica.descricao
    }
    await MusicasModel.create(ObjectSong)
    return res.status(200).json({ msg: MessagesHelper.SavedSong })
  } catch (e) {
    console.log(e)
    return res.status(401).json({ erro: MessagesHelper.RegisterNotValid })
  }
}

export default conectarMongoDB(endpointCadastro)
