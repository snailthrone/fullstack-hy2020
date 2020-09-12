import { v4 as uuidv4 } from 'uuid';

import data from '../../data/patients';

import { NewPatient, Patient, PublicPatient } from '../types';
import toNewPatient, { parseGender } from '../utils/toNewPatient';

export const getPatient = (id: string): Patient | null => {
  const found = data.map((d) => ({ id: d.id, ...toNewPatient(d), entries: d.entries })).find((d) => d.id === id);
  if (found) {
    return ({ ...found });
  }
  return null;
};
export const getPatients = (): PublicPatient[] => data.map(({ name, id, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender:  parseGender(gender), occupation }));

export const addPatient = (patient: NewPatient): Omit<Patient, 'entries'> => {
  const id = uuidv4();
  const newPatient = {...patient, id, entries: []};
  data.push(newPatient);
  return newPatient;
};