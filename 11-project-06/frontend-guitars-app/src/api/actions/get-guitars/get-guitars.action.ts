import { mapGuitarResponseToGuitar } from '../../../utils';
import api from '../../config/axios-guitars';

export const getGuitars = async (): Promise<Guitar[]> => {
  const data = (await api.get<GuitarDBResponse[]>('/guitars')).data;
  return data.map(mapGuitarResponseToGuitar);
}