import React, { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react';

import { CoursePart } from './types';

type Props = {
  setCourseParts: Dispatch<SetStateAction<(CoursePart)[]>>;
};

const NewCourse: FC<Props> = ({ setCourseParts }) => {
  const [name, setName] = useState('');
  const [exerciseCount, setExerciseCount] = useState('');
  const [description, setDescription] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedExerciseCount = Number(exerciseCount);

    if (isNaN(parsedExerciseCount)) {
      throw new Error('Exercise count is not number');
    }

    const newCourse: CoursePart = { name, exerciseCount: parsedExerciseCount, description };

    setCourseParts(courses => [...courses, newCourse])

    setName('');
    setExerciseCount('');
    setDescription('');
  }

  return (
    <form onSubmit={submit}>
      <h2>Add new course</h2>
      <div>
        <label>
          Name:
          {' '}
          <input onChange={({ target: { value }}) => setName(value)} type="text" value={name} />
        </label>
      </div>
      <div>
        <label>
          Exercise count:
          {' '}
          <input onChange={({ target: { value }}) => setExerciseCount(value)} type="text" value={exerciseCount} />
        </label>
      </div>
      <div>
        <label>
          Description:
          {' '}
          <input onChange={({ target: { value }}) => setDescription(value)} type="text" value={description} />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default NewCourse;
