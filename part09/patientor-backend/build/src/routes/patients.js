"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const patientService_1 = require("../services/patientService");
const toNewPatient_1 = __importDefault(require("../utils/toNewPatient"));
const toNewEntry_1 = __importDefault(require("../utils/toNewEntry"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const data = patientService_1.getPatients();
    res.json({ data });
});
router.get('/:id', (req, res) => {
    const patient = patientService_1.getPatient(req.params.id);
    if (patient) {
        res.json(patient);
    }
    else {
        res.send('Patient not found');
    }
});
router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient_1.default(req.body);
        const addedPatient = patientService_1.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).send(`Error: ${e.message}`);
        }
        else {
            throw e;
        }
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry_1.default(req.body);
        const modifiedPatient = patientService_1.addPatientEntry(req.params.id, newEntry);
        res.json(modifiedPatient);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).send(`Error: ${e.message}`);
        }
        else {
            throw e;
        }
    }
});
exports.default = router;
