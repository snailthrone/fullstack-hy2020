import data from '../../data/diagnoses.json';

import { Diagnosis } from '../types';

export const getDiagnoses = (): Diagnosis[] => data;

export const addDiagnose = (): null => null;
