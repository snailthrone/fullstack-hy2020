import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => (
  <h1>{course}</h1>
);

function Part({ exercises, name }) {
  return <p>{name} {exercises}</p>
}

const Content = ({ parts }) => {
  return (
    <>
      {
        parts.map((c) => <Part {...c} key={c.name} />)
      }
    </>
  );
}

const Total = ({ parts }) => {
  const total = parts.map(({ exercises }) => exercises).reduce((c, p) => c + p, 0);
  return <p>Number of exercises {total}</p>;
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

ReactDOM.render(<App />,document.getElementById('root'));

