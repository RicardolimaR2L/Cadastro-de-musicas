import type { NextApiRequest, NextApiResponse } from 'next'
import type { RespostaPadraoMsg } from '../../types/respostaPadrao'
import { conectarMongoDB } from '../../middlewares/conectarMongoDb'
import { MessagesHelper } from '../../helpers/messageHelpers'
import { userRegisterType } from '../../types/userRegisterType'
import { UserModel } from '../../models/userSchema'

const endpointCadastro = async (
  req: NextApiRequest,
  res: NextApiResponse<RespostaPadraoMsg>
) => {
  try {
    const newUser = req.body as userRegisterType
    const minLength = 2
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[0-9a-zA-Z\W_]{8,}$/

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!newUser?.nome || newUser.nome.length < minLength) {
      return res.status(401).json({
        erro: MessagesHelper.NameNotValid
      })
    }
    if (!newUser?.email || !emailRegex.test(newUser.email)) {
      return res.status(401).json({ erro: MessagesHelper.EmailNotValid })
    }
    if (!newUser?.senha || !passwordRegex.test(newUser.senha)) {
      return res.status(401).json({
        erro: MessagesHelper.PasswordNotValid
      })
    }
    const user = {
      nome: newUser.nome,
      email: newUser.email,
      senha: newUser.senha
    }
    await UserModel.create(user)
    console.log(user)
    return res.status(200).json({ msg: MessagesHelper.SavedUser })
  } catch (e) {
    console.log(e)
    return res.status(401).json({ erro: MessagesHelper.UserRegisterNotValid })
  }
}

export default conectarMongoDB(endpointCadastro)
