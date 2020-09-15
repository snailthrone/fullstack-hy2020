import React from 'react';
import { Route, Link, Switch, useRouteMatch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';

// Hooks
import { setDiagnoses, setPatientList, useStateValue } from './state';

// Components
import PatientPage from './PatientPage';
import PatientListPage from './PatientListPage';

// Services
import { getDiagnoses } from './services/diagnoses';
import { getPatients } from './services/patients';

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    // axios.get<Promise<string>>(`/ping`);
    const fetchPatientList = async () => {
      console.log('Fetching patients');
      try {
        const patientListFromApi = await getPatients();
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    const fetchDiagnoses = async () => {
      console.log('Fetching diagnoses');
      try {
        const diagnosesFromApi = await getDiagnoses();
        dispatch(setDiagnoses(diagnosesFromApi));
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchPatientList();
    fetchDiagnoses();
  }, [dispatch]);

  const routeMatch = useRouteMatch<{ id: string }>('/patients/:id');
  const patientId = routeMatch?.params.id;

  return (
    <div className="App">
      <Container>
        <Header as="h1">Patientor</Header>
        <Button as={Link} to="/" primary>
          Home
        </Button>
        <Divider hidden />
        <Switch>
          <Route path="/patients/:id">
            {patientId ? <PatientPage id={patientId} /> : <div>Patient not found</div>}
          </Route>
          <Route path="/">
            <PatientListPage />
          </Route>
        </Switch>
      </Container>
    </div>
  );
};

export default App;
