import React, { FC, useEffect, useState } from 'react';
import { Header, Icon, List, Segment } from 'semantic-ui-react';
import AddPatientEntry from '../AddPatientEntry';
import EntryDetails from '../EntryDetails';

import { addPatientEntry, getPatient } from '../services/patients';
import { useStateValue, updatePatient } from '../state';

import { EntryFormValues, Gender } from '../types';

type GenderIcon = 'mars' | 'venus' | 'genderless' | 'venus mars';

const getIcon = (gender: Gender): GenderIcon => {
  switch (gender) {
    case 'male':
      return 'mars';
    case 'female':
      return 'venus';
    case 'other':
      return 'genderless';
    default:
      return 'venus mars';
  }
};

type Props = {
  id: string;
};

const PatientPage: FC<Props> = ({ id }) => {
  const [{ patients }, dispatch] = useStateValue();
  const [error, setError] = useState<string | undefined>();
  const patient = patients[id];

  useEffect(() => {
    const fetchPatient = async (): Promise<void> => {
      console.log('Fetching patient', id);
      try {
        const patientFromApi = await getPatient(id);
        dispatch(updatePatient(patientFromApi));
      } catch (error) {
        console.error(error.response.data);
        setError(error.response.data);
      }
    };
    if (patient) {
      if (!patient.ssn && !patient.entries) {
        fetchPatient();
      }
    }
  }, [dispatch, id, patients, patient]);

  useEffect(() => {
    window.setTimeout(() => {
      setError(undefined);
    }, 3000);
  }, [error]);

  const submitNewEntry = async (values: EntryFormValues): Promise<void> => {
    console.log(values);
    try {
      const modifiedPatient = await addPatientEntry(id, values);
      dispatch(updatePatient(modifiedPatient));
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data);
    }
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header as="h2">
        {patient.name} <Icon name={getIcon(patient.gender)}></Icon>
      </Header>
      <List>
        <List.Item>ssn: {patient.ssn}</List.Item>
        <List.Item>occupation: {patient.occupation}</List.Item>
      </List>
      {patient.entries && (
        <>
          <Header as="h3">Entries</Header>
          {patient.entries.map((entry) => (
            <EntryDetails {...entry} key={entry.id} />
          ))}
        </>
      )}
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddPatientEntry submit={submitNewEntry} />
    </div>
  );
};

export default PatientPage;
