/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';

import { addPatient, getPatient, getPatients } from '../services/patientService';
import toNewPatient from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = getPatients();
  console.log(data);
  res.json({ data });
});

router.get('/:id', (req, res) => {
  const patient = getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.send('Patient not found');
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    if (e instanceof Error) {
      console.log('Error:', e.message);
      res.send(e.message);
    } else {
      throw e;
    }
  }
});

router.post('/:id/entries', (req, res) => {
  console.log(req.params.id);
  res.json({ foo: 'bar' });
});

export default router;