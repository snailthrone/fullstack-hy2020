import axios from 'axios';

import { apiBaseUrl } from '../constants';

export const getDiagnoses = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/diagnoses`);
  return data;
};
