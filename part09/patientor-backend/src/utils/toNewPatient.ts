/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Gender, NewPatient } from '../types';

export const isDate = (date: string): boolean => Boolean(Date.parse(date));

const isSsn = (ssn: string): boolean => {
  const restring = /^[A-Za-z0-9]+$/;
  const [prefix, suffix] = ssn.split('-');
  if (!(restring.exec(prefix)) || !(restring.exec(suffix)) || !(ssn.length >= 10) || !(ssn.length <= 11) || !ssn.includes('-') || !(prefix.length === 6)) {
    return false;
  }
  return true;
};

export const isString = (text: any): text is string => typeof text === 'string' || text instanceof String;

export const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isGender = (param: any): param is Gender => Object.values(Gender).includes(param); 

export const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name ${name}`);
  }
  return name;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error(`Incorrect or missing ssn ${ssn}`);
  }
  return ssn;
};

const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender)
  };
  return newPatient;
};

export default toNewPatient;
