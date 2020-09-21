import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import {
  DiagnosisSelection,
  EntryOption,
  NumberField,
  SelectField,
  TextField,
} from '../AddPatientModal/FormField';

import { useStateValue } from '../state';
import { Entry, EntryFormValues } from '../types';
import * as Yup from 'yup';

type Props = {
  submit: (values: EntryFormValues) => Promise<void>;
};

const initialValues: Omit<Entry, 'id'> = {
  type: 'HealthCheck',
  description: '',
  date: '',
  specialist: '',
};

const entryOptions: EntryOption[] = [
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
];

const SubFields: FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'HealthCheck':
      return (
        <Field
          label="Health Check Rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );
    case 'Hospital':
      return (
        <>
          <Header as="h4">Discharge</Header>
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Criteria"
            placeholder="Discharge criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>
      );
    case 'OccupationalHealthcare':
      return (
        <>
          <Field
            label="Employer"
            placeholder="Employer"
            name="employerName"
            component={TextField}
          />
          <Header as="h4">Sick leave</Header>
          <Field
            label="Starts"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="Ends"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
        </>
      );
    default:
      return null;
  }
};

const EntrySchema = Yup.object().shape({
  type: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  date: Yup.date().required('Required'),
  specialist: Yup.string().required('Required'),
  diagnoses: Yup.array().of(Yup.string()).notRequired(),
  discharge: Yup.object()
    .shape({
      date: Yup.date(),
      criteria: Yup.string(),
    })
    .notRequired(),
  employerName: Yup.string().notRequired(),
  sickLeave: Yup.object()
    .shape({
      startDate: Yup.date(),
      endDate: Yup.date(),
    })
    .notRequired(),
  healthCheckRating: Yup.number().min(0).max(3).integer().notRequired(),
});

const AddPatientEntry: FC<Props> = ({ submit }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Container>
      <Header as="h3">Add new entry</Header>
      <Formik initialValues={initialValues} onSubmit={submit} validationSchema={EntrySchema}>
        {({ dirty, isValid, setFieldValue, setFieldTouched, values }) => {
          return (
            <Form className="form ui">
              <SelectField label="Type" name="type" options={entryOptions} />
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              <Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <DiagnosisSelection
                diagnoses={diagnoses}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
              <SubFields type={values.type} />
              <Grid>
                <Grid.Column>
                  <Button type="submit" color="green" disabled={!dirty || !isValid}>
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default AddPatientEntry;
