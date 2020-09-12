/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { v4 as uuidv4 } from 'uuid';

// Types
import { Diagnosis, Discharge, Entry, EntryType, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthCareEntry, SickLeave } from "../types";

import { isString, parseDate } from './toNewPatient'; 

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description ${description}`);
  }
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing description ${specialist}`);
  }
  return specialist;
};

const isType = (param: any): param is EntryType => {
  switch(param) {
    case 'Hospital':
      return true;
    case 'OccupationalHealthcare':
      return true;
    case 'HealthCheck':
      return true;
    default:
      return false;
  }
};

const parseType = (type: any): EntryType => {
  if (!type || !isType(type)) {
    throw new Error(`Missing or invalid entry type ${type}`);
  }
  return type;
};

const parseDischargeCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw Error(`Invalid or missing criteria ${criteria}`);
  }
  return criteria;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw Error('Missing discharge');
  }

  const newDischarge: Discharge = {
    date: parseDate(discharge.date),
    criteria: parseDischargeCriteria(discharge.criteria)
  };

  return newDischarge;
};

const areDiagnoses = (diagnoses: Array<Diagnosis['code']>): boolean => {
  if (Array.isArray(diagnoses)) {
    return diagnoses.every(diagnosis => isString(diagnosis));
  }
  return false;
};

const parseDiagnoses = (diagnoses: any): Array<Diagnosis['code']> => {
  if (!diagnoses) {
    return [];
  }

  if (!areDiagnoses(diagnoses)) {
    throw Error('Invalid diagnoses');
  }
  
  return diagnoses as Array<Diagnosis['code']>;
};

const parseEmployerName = (employer: any): string => {
  if (!employer || !isString(employer)) {
    throw Error(`Invalid or missing employer ${employer}`);
  }
  return employer;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave) {
    throw Error('Missing sick leave');
  }

  const newSickLeave: SickLeave = {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };

  return newSickLeave;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => Object.values(HealthCheckRating).includes(param);

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw Error(`Invalid or missing health check rating`);
  }
  return rating;
};

const toNewHospitalEntry = (object: any): HospitalEntry => {
  const newHospitalEntry: HospitalEntry = {
    id: uuidv4(),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnoses(object.diagnosisCodes),
    type: 'Hospital',
    discharge: parseDischarge(object.discharge)
  };

  return newHospitalEntry;
};

const toNewHealthCheckEntry = (object: any): HealthCheckEntry => {
  const newHealthCheckEntry: HealthCheckEntry = {
    id: uuidv4(),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnoses(object.diagnosisCodes),
    type: 'HealthCheck',
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
  };
  return newHealthCheckEntry;
};



const toNewOccupationalHealthcareEntry = (object: any): OccupationalHealthCareEntry => {
  const newOccupationalHealthcareEntry: OccupationalHealthCareEntry = {
    id: uuidv4(),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnoses(object.diagnosisCodes),
    type: 'OccupationalHealthcare',
    employerName: parseEmployerName(object.employerName),
    sickLeave: parseSickLeave(object.sickLeave),
  };

  return newOccupationalHealthcareEntry;
};

const toNewEntry = (object: any): Entry => {
  const type = parseType(object.type);
  switch (type) {
    case 'Hospital':
      return toNewHospitalEntry(object);
    case 'HealthCheck':
      return toNewHealthCheckEntry(object);
    case 'OccupationalHealthcare':
      return toNewOccupationalHealthcareEntry(object);
    default:
      throw Error('Entry is invalid type');
  }
};

export default toNewEntry;