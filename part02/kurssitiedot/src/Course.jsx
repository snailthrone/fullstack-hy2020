import React from 'react'

const Header = ({ name }) => (
  <h2>{name}</h2>
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
  console.log(total);
  return <p><strong>Number of exercises: {total}</strong></p>;
}

const Course = ({ name, parts }) => (
  <>
    <Header name={name} />
    <Content parts={parts} />
    <Total parts={parts} />
  </>
)

export default Course
