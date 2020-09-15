"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPatientEntry = exports.addPatient = exports.getPatients = exports.getPatient = void 0;
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const toNewPatient_1 = __importStar(require("../utils/toNewPatient"));
let patientData = patients_1.default;
exports.getPatient = (id) => {
    const found = patientData.map((d) => (Object.assign(Object.assign({ id: d.id }, toNewPatient_1.default(d)), { entries: d.entries }))).find((d) => d.id === id);
    if (found) {
        return (Object.assign({}, found));
    }
    return null;
};
exports.getPatients = () => patientData.map(({ name, id, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender: toNewPatient_1.parseGender(gender), occupation }));
exports.addPatient = (patient) => {
    const id = uuid_1.v4();
    const newPatient = Object.assign(Object.assign({}, patient), { id, entries: [] });
    patientData.push(newPatient);
    return newPatient;
};
exports.addPatientEntry = (id, entry) => {
    const patient = patientData.find((d) => d.id === id);
    if (!patient) {
        throw Error(`Patient ${entry.id} not found`);
    }
    const patientWithEntry = Object.assign(Object.assign({}, patient), { entries: [...patient.entries, entry] });
    patientData = patients_1.default.map(d => {
        if (d.id === patient.id) {
            return patientWithEntry;
        }
        return d;
    });
    return patientWithEntry;
};
