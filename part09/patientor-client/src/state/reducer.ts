import { State } from './state';
import { Diagnosis, Patient } from '../types';

export type Action =
  | {
      type: 'SET_DIAGNOSES';
      payload: Diagnosis[];
    }
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'UPDATE_PATIENT';
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DIAGNOSES':
      return {
        ...state,
        diagnoses: action.payload,
      };
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce((memo, patient) => ({ ...memo, [patient.id]: patient }), {}),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export const SET_DIAGNONES = 'SET_DIAGNOSES';
export const ADD_PATIENT = 'ADD_PATIENT';
export const SET_PATIENT_LIST = 'SET_PATIENT_LIST';
export const UPDATE_PATIENT = 'UPDATE_PATIENT';

interface SetDiagnosesAction {
  type: typeof SET_DIAGNONES;
  payload: Diagnosis[];
}

interface AddPatientAction {
  type: typeof ADD_PATIENT;
  payload: Patient;
}

interface SetPatientListAction {
  type: typeof SET_PATIENT_LIST;
  payload: Patient[];
}
interface UpdatePatientAction {
  type: typeof UPDATE_PATIENT;
  payload: Patient;
}

export type DiagnosisActionTypes = SetDiagnosesAction;

export type PatientActionTypes = AddPatientAction | SetPatientListAction | UpdatePatientAction;

export const setDiagnoses = (diagnoses: Diagnosis[]): DiagnosisActionTypes => ({
  type: SET_DIAGNONES,
  payload: diagnoses,
});

export const addPatient = (patient: Patient): PatientActionTypes => ({
  type: ADD_PATIENT,
  payload: patient,
});

export const setPatientList = (patients: Patient[]): PatientActionTypes => ({
  type: SET_PATIENT_LIST,
  payload: patients,
});

export const updatePatient = (patient: Patient): PatientActionTypes => ({
  type: UPDATE_PATIENT,
  payload: patient,
});
