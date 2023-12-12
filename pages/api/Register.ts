import type { NextApiRequest, NextApiResponse } from 'next'
import type { RespostaPadraoMsg } from '../../types/respostaPadrao'
import { CadastroMusica } from '../../types/cadastroMusica'
import { conectarMongoDB } from '../../middlewares/conectarMongoDb'
import { MusicasModel } from '../../models/musicaSchema'

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
        erro: 'Nome Iválido, o nome precisa ter no mínimo 5 caracteres'
      })
    }
    if (!musica?.url || !urlRegex.test(musica.url)) {
      return res.status(401).json({ erro: 'Url Iválida' })
    }
    if (!musica?.descricao || musica.descricao.length < maxLength) {
      return res.status(401).json({
        erro: 'descrição Inválida, precisa ter no mínimo 10 caracteres'
      })
    }
    const musicaASerSalva = {
      nome: musica.nome,
      url: musica.url,
      descricao: musica.descricao
    }
    await MusicasModel.create(musicaASerSalva)
    return res.status(200).json({ msg: 'Nova música salva com sucesso' })
  } catch (e) {
    console.log('Ocorreu um erro ao cadastrar música, dados inválidos ', e)
  }
}

export default conectarMongoDB(endpointCadastro)
