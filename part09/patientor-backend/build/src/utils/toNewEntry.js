"use strict";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
// Types
const types_1 = require("../types");
const toNewPatient_1 = require("./toNewPatient");
const parseDescription = (description) => {
    if (!description || !toNewPatient_1.isString(description)) {
        throw new Error(`Incorrect or missing description ${description}`);
    }
    return description;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !toNewPatient_1.isString(specialist)) {
        throw new Error(`Incorrect or missing description ${specialist}`);
    }
    return specialist;
};
const isType = (param) => {
    switch (param) {
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
const parseType = (type) => {
    if (!type || !isType(type)) {
        throw new Error(`Missing or invalid entry type ${type}`);
    }
    return type;
};
const parseDischargeCriteria = (criteria) => {
    if (!criteria || !toNewPatient_1.isString(criteria)) {
        throw Error(`Invalid or missing criteria ${criteria}`);
    }
    return criteria;
};
const parseDischarge = (discharge) => {
    if (!discharge) {
        throw Error('Missing discharge');
    }
    const newDischarge = {
        date: toNewPatient_1.parseDate(discharge.date),
        criteria: parseDischargeCriteria(discharge.criteria)
    };
    return newDischarge;
};
const areDiagnoses = (diagnoses) => {
    if (Array.isArray(diagnoses)) {
        return diagnoses.every(diagnosis => toNewPatient_1.isString(diagnosis));
    }
    return false;
};
const parseDiagnoses = (diagnoses) => {
    if (!diagnoses) {
        return [];
    }
    if (!areDiagnoses(diagnoses)) {
        throw Error('Invalid diagnoses');
    }
    return diagnoses;
};
const parseEmployerName = (employer) => {
    if (!employer || !toNewPatient_1.isString(employer)) {
        throw Error(`Invalid or missing employer ${employer}`);
    }
    return employer;
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave) {
        throw Error('Missing sick leave');
    }
    const newSickLeave = {
        startDate: toNewPatient_1.parseDate(sickLeave.startDate),
        endDate: toNewPatient_1.parseDate(sickLeave.endDate),
    };
    return newSickLeave;
};
const isHealthCheckRating = (param) => Object.values(types_1.HealthCheckRating).includes(param);
const parseHealthCheckRating = (rating) => {
    if (!rating || !isHealthCheckRating(rating)) {
        throw Error(`Invalid or missing health check rating`);
    }
    return rating;
};
const toNewHospitalEntry = (object) => {
    const newHospitalEntry = {
        id: uuid_1.v4(),
        description: parseDescription(object.description),
        date: toNewPatient_1.parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnoses(object.diagnosisCodes),
        type: 'Hospital',
        discharge: parseDischarge(object.discharge)
    };
    return newHospitalEntry;
};
const toNewHealthCheckEntry = (object) => {
    const newHealthCheckEntry = {
        id: uuid_1.v4(),
        description: parseDescription(object.description),
        date: toNewPatient_1.parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnoses(object.diagnosisCodes),
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    };
    return newHealthCheckEntry;
};
const toNewOccupationalHealthcareEntry = (object) => {
    const newOccupationalHealthcareEntry = {
        id: uuid_1.v4(),
        description: parseDescription(object.description),
        date: toNewPatient_1.parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnoses(object.diagnosisCodes),
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
    };
    return newOccupationalHealthcareEntry;
};
const toNewEntry = (object) => {
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
exports.default = toNewEntry;
