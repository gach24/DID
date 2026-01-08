import { mapGuitarResponseToGuitar } from '../../../utils';
import api from '../../config/axios-guitars';

interface CreateGuitarPayload {
  name: string;
  image: string;
  description: string;
  price: number;
}

export const createGuitar = async (payload: CreateGuitarPayload): Promise<Guitar> => {
  const data = (await api.post<GuitarDBResponse>('/guitars', payload)).data;
  return mapGuitarResponseToGuitar(data);
}

