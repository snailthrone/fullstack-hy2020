import express from 'express';

import diagnosesRouter from './src/routes/diagnoses';
import patientsRouter from './src/routes/patients';
import pingRouter from './src/routes/ping';

const app = express();
app.use(express.json());

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
app.use('/ping', pingRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});