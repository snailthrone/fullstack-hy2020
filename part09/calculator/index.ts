import express from 'express';
import bodyParser from 'body-parser';

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
// import calculateExercises from './exerciseCalculator';

const app = express();
const parser = bodyParser.json()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (!isNaN(weight) && !isNaN(height)) {
    return res.json({ weight, height, bmi: calculateBmi(height, weight) });
  }

  return res.json({ error: 'malformated parameters' });
});

app.post('/exercises', parser, (req, res) => {
  const { body } = req;

  const target = body?.target;
  const dailyExercises = body?.dailyExercises;

  if (!target || !dailyExercises) {
    return res.json({ error: "parameters missing" })
  }

  if (isNaN(Number(target)) || dailyExercises.some((v: any) => isNaN(Number(v)))) {
    return res.json({ error: "malformatted parameters" })
  }

  return res.json(calculateExercises(dailyExercises, target))
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
