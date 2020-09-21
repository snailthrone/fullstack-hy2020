import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { Diagnosis } from '../types';

export const getDiagnoses = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};
