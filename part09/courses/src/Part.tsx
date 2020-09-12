import React, { FC } from 'react';

import { CoursePartBase } from './types';

interface Props extends CoursePartBase {
  description?: string;
  exerciseSubmissionLink?: string;
  groupProjectCount?: number;
}

const Part: FC<Props> = props => {
  const { description, exerciseCount, exerciseSubmissionLink, groupProjectCount, name } = props;
  return (
    <>
      <p>{name}</p>
      <p>{exerciseCount}</p>
      { description && <p>{description}</p>}
      { exerciseSubmissionLink && <p><a href={exerciseSubmissionLink}>{exerciseSubmissionLink}</a></p> }
      { groupProjectCount && <p>{groupProjectCount}</p>}
    </>
  )
}

export default Part;
