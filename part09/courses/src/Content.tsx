import React, { FC } from 'react';

import Part from './Part';

import { CoursePart } from './types';

type Props = {
  courses: CoursePart[];
};

const Content: FC<Props> = ({ courses }) => (
  <>
    {
      courses.map((course) => {
        switch(course.name) {
          case 'Fundamentals':
            return <Part {...course} key={course.name} />;
          case 'Using props to pass data':
            return <Part {...course} key={course.name} />
          case 'Deeper type usage':
            return <Part {...course} key={course.name} />
          case 'React with types':
            return <Part {...course} key={course.name} />
          default:
            throw new Error(
              `Unhandled discriminated union member: ${JSON.stringify(course)}`
            );
        }
      })
    }
  </>
);

export default Content;
