import React, { FC } from 'react';
import { Header, Icon, List, Segment } from 'semantic-ui-react';

import { useStateValue } from '../state';

import {
  Entry,
  HealthCheckEntry as HealthCheck,
  HospitalEntry as Hospital,
  OccupationalHealthCareEntry as OccupationalHealthCare,
} from '../types';

type RatingColor = 'black' | 'green' | 'yellow' | 'red';

const getRatingColor = (rating: number): RatingColor => {
  switch (rating) {
    case 3:
      return 'black';
    case 2:
      return 'red';
    case 1:
      return 'yellow';
    case 0:
      return 'green';
    default:
      throw Error(`Rating (${rating}) is out of range`);
  }
};

const Diagnose: FC<{ code: string }> = ({ code }) => {
  const [{ diagnoses }] = useStateValue();

  const diagnoseName = diagnoses.find((diagnosis) => diagnosis.code === code)?.name;

  return (
    <>
      {code} {diagnoseName}
    </>
  );
};

const HealthCheckEntry: FC<HealthCheck> = ({
  date,
  description,
  diagnosisCodes,
  healthCheckRating,
}) => {
  return (
    <Segment>
      <Header as="h4">
        {date} <Icon name="doctor" />
      </Header>
      <p>
        <em>{description}</em>
      </p>
      <Icon color={getRatingColor(healthCheckRating)} name="heart" />
      {diagnosisCodes && (
        <List.List as="ul" bulleted="true">
          {diagnosisCodes.map((code) => (
            <List.Item as="li" key={code}>
              <Diagnose code={code} />
            </List.Item>
          ))}
        </List.List>
      )}
    </Segment>
  );
};

const HospitalEntry: FC<Hospital> = ({ date, description, diagnosisCodes }) => {
  return (
    <Segment>
      <Header as="h4">
        {date} <Icon name="hospital" />
      </Header>
      <p>
        <em>{description}</em>
      </p>
      {diagnosisCodes && (
        <List.List as="ul" bulleted="true">
          {diagnosisCodes.map((code) => (
            <List.Item as="li" key={code}>
              <Diagnose code={code} />
            </List.Item>
          ))}
        </List.List>
      )}
    </Segment>
  );
};

const OccupationalHealthCareEntry: FC<OccupationalHealthCare> = ({
  date,
  description,
  diagnosisCodes,
  employerName,
}) => {
  return (
    <Segment>
      <Header as="h4">
        {date} <Icon name="stethoscope" />
        {employerName}
      </Header>
      <p>
        <em>{description}</em>
      </p>
      {diagnosisCodes && (
        <List.List as="ul" bulleted="true">
          {diagnosisCodes.map((code) => (
            <List.Item as="li" key={code}>
              <Diagnose code={code} />
            </List.Item>
          ))}
        </List.List>
      )}
    </Segment>
  );
};

const EntryDetails: FC<Entry> = (props) => {
  switch (props.type) {
    case 'HealthCheck':
      return <HealthCheckEntry {...props} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthCareEntry {...props} />;
    case 'Hospital':
      return <HospitalEntry {...props} />;
    default:
      throw new Error(`Unhandled discriminated union member: ${JSON.stringify(props)}`);
  }
};

export default EntryDetails;
