import { MusicasModel } from '../../models/musicaSchema';

type MusicParameter = {
  id: string;
};

export const FindmusicById = async ({ id }: MusicParameter) => {
  const musicasEncontradas = await MusicasModel.findById(id); // Retorna a música pelo ID


  if (!musicasEncontradas) {
    return null;
  }

  return {
    nome: musicasEncontradas.nome,
    url: musicasEncontradas.url,
    _id: musicasEncontradas._id,
    descricao: musicasEncontradas.descricao
  };
};

export const FindAllMusic = async () => {
  const musicasEncontradas = await MusicasModel.find(); // Retorna todas as músicas
  if (!musicasEncontradas || musicasEncontradas === null  ) {
    return { erro: 'Música não encontrada' };
  }
  return musicasEncontradas;
};
