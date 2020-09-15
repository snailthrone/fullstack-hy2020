"use strict";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGender = exports.parseDate = exports.isString = exports.isDate = void 0;
const types_1 = require("../types");
exports.isDate = (date) => Boolean(Date.parse(date));
const isSsn = (ssn) => {
    const restring = /^[A-Za-z0-9]+$/;
    const [prefix, suffix] = ssn.split('-');
    if (!(restring.exec(prefix)) || !(restring.exec(suffix)) || !(ssn.length >= 10) || !(ssn.length <= 11) || !ssn.includes('-') || !(prefix.length === 6)) {
        return false;
    }
    return true;
};
exports.isString = (text) => typeof text === 'string' || text instanceof String;
exports.parseDate = (date) => {
    if (!date || !exports.isString(date) || !exports.isDate(date)) {
        throw new Error(`Incorrect or missing date: ${date}`);
    }
    return date;
};
const isGender = (param) => Object.values(types_1.Gender).includes(param);
exports.parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};
const parseName = (name) => {
    if (!name || !exports.isString(name)) {
        throw new Error(`Incorrect or missing name ${name}`);
    }
    return name;
};
const parseOccupation = (occupation) => {
    if (!occupation || !exports.isString(occupation)) {
        throw new Error(`Incorrect or missing occupation: ${occupation}`);
    }
    return occupation;
};
const parseSsn = (ssn) => {
    if (!ssn || !exports.isString(ssn) || !isSsn(ssn)) {
        throw new Error(`Incorrect or missing ssn ${ssn}`);
    }
    return ssn;
};
const toNewPatient = (object) => {
    const newPatient = {
        name: parseName(object.name),
        ssn: parseSsn(object.ssn),
        dateOfBirth: exports.parseDate(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        gender: exports.parseGender(object.gender)
    };
    return newPatient;
};
exports.default = toNewPatient;
