import { mapGuitarResponseToGuitar } from '../../../utils';
import api from '../../config/axios-guitars';

export const getGuitarsById = async (id: string): Promise<Guitar> => {
  const data = (await api.get<GuitarDBResponse>(`/guitars/${id}`)).data;
  return mapGuitarResponseToGuitar(data);
}

