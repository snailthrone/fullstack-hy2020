import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const countAverage = (values, n) => (
  values
    .filter(({ amount }) => amount > 0)
    .map(({ amount, value }) => amount * value)
    .reduce((c, p) => c + p, 0) / n
);

const countPositive = (values, n) => (
  values.filter(({ type }) => type === 'Good').map(({ amount }) => amount) / n * 100
);

const Button = ({ children, handler }) => (
  <button onClick={handler} type="button">{children}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ values }) => {
  const n = values.map(({ amount }) => amount).reduce((c, p) => c + p);
  const stats = [
    {
      text: 'All',
      value: n,
    },
    {
      text: 'Average',
      value: countAverage(values, n),
    },
    {
      text: 'Positive',
      value: `${countPositive(values, n)} %`,
    }
  ];
  if (n > 0) {
    return (
      <table>
        <tbody>
          {
            values.map(({ amount, type }) => (
              <StatisticLine key={type} text={type} value={amount} />
            ))
          }
          {
            stats.map(({ text, value }) => (
              <StatisticLine key={text} text={text} value={value} />
            ))
          }
        </tbody>
      </table>
    )
  }
  return <p>No feedback given</p>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const values = [{
    type: 'Good',
    amount: good,
    value: 1,
  }, {
    type: 'Neutral',
    amount: neutral,
    value: 0,
  }, {
    type: 'Bad',
    amount: bad,
    value: -1,
  }];

  return (
    <>
      <h1>Give Feedback</h1>
      <Button handler={() => { setGood((value) => value + 1) }}>Good</Button>
      <Button handler={() => { setNeutral((value) => value + 1)}}>Neutral</Button>
      <Button handler={() => { setBad((value) => value + 1)}}>Bad</Button>
      <Statistics values={values} />
    </>
  )
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

