import { v4 as uuidv4 } from 'uuid';

import data from '../../data/patients';

import { Entry, NewPatient, Patient, PublicPatient } from '../types';
import toNewPatient, { parseGender } from '../utils/toNewPatient';

let patientData = data;

export const getPatient = (id: string): Patient | null => {
  const found = patientData.map((d) => ({ id: d.id, ...toNewPatient(d), entries: d.entries })).find((d) => d.id === id);
  if (found) {
    return ({ ...found });
  }
  return null;
};
export const getPatients = (): PublicPatient[] => patientData.map(({ name, id, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender:  parseGender(gender), occupation }));

export const addPatient = (patient: NewPatient): Omit<Patient, 'entries'> => {
  const id = uuidv4();
  const newPatient = {...patient, id, entries: []};
  patientData.push(newPatient);
  return newPatient;
};

export const addPatientEntry = (id: string, entry: Entry): Patient => {
  const patient = patientData.find((d) => d.id === id);
  
  if (!patient) {
    throw Error(`Patient ${entry.id} not found`);
  }

  const patientWithEntry = {...patient, entries: [...patient.entries, entry] };

  patientData = data.map(d => {
    if (d.id === patient.id) {
      return patientWithEntry;
    }
    return d;
  });

  return patientWithEntry;
};