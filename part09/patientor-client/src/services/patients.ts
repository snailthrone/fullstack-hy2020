import axios from 'axios';

import { PatientFormValues } from '../AddPatientModal/AddPatientForm';
import { apiBaseUrl } from '../constants';
import { EntryFormValues, Patient } from '../types';

export const addPatient = async (values: PatientFormValues): Promise<Patient> => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, values);
  return data;
};

export const addPatientEntry = async (id: string, values: EntryFormValues): Promise<Patient> => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, values);
  return data;
};

export const getPatient = async (id: string): Promise<Patient> => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

export const getPatients = async (): Promise<Patient[]> => {
  const { data } = await axios.get<{ data: Patient[] }>(`${apiBaseUrl}/patients`);
  return data.data;
};
