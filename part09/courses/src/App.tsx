import React, { useState } from 'react';

import Content from './Content';
import Header from './Header';
import NewCourse from './NewCourse';
import Total from './Total';

import { CoursePart } from './types'

const initialCourseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  }
];

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const [courseParts, setCourseParts] = useState<Array<CoursePart>>(initialCourseParts)

  const total = courseParts.map(({ exerciseCount }) => exerciseCount).reduce((c, p) => c + p, 0);

  return (
    <div>
      <Header>{courseName}</Header>
      <Content courses={courseParts} />
      <Total total={total} />
      <NewCourse setCourseParts={setCourseParts} />
    </div>
  );
};
export default App;
