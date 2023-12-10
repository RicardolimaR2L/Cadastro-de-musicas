import type { NextApiRequest, NextApiResponse } from 'next'
import type { RespostaPadraoMsg } from '../../types/respostaPadrao'
import { CadastroMusica } from '../../types/cadastroMusica'
import { conectarMongoDB } from '../../middlewares/conectarMongoDb'
import { MusicasModel } from '../../models/musicaSchema'

//to do:
{
  /*

Pegar o id da musica
Pegar os dados a serem atualizados no req.body
procuara o metodo de atualizar dados do mongoose ou mongo DB (save)
passar como parametros o id e os dados 
validar todas as etapas
 
*/
}
