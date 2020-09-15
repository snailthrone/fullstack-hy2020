interface Rating {
  rating: number;
  ratingDescription: string;
}

interface Result extends Rating {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
}

type Arguments = {
  target: number;
  values: number[];
};

const parseArgs = (args: string[]): Arguments => {
  if (args.length < 10) {
    throw new Error('Not enough arguments');
  }
  if (args.length > 10) {
    throw new Error('Too many arguments');
  }

  const target = Number(args[2]);
  const values = args.slice(2, args.length).map((val) => Number(val));

  if (!isNaN(target) && values.every(val => !isNaN(val))) {
    return { target, values };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const rateExercise = (average: number, target: number): Rating => {
  if (average >= target) {
    return {
      rating: 3,
      ratingDescription: 'Good!'
    };

  } else if (target - average === 0.5) {
    return {
      rating: 2,
      ratingDescription: 'Not too bad but could be better'
    };
  }
  return {
    rating: 1,
    ratingDescription: 'You should have done better'
  };
};

const calculateExercises = (excercises: number[], target: number): Result => {
  const periodLength = excercises.length;
  const trainingDays = excercises.filter(e => e > 0).length;
  const average = excercises.reduce((c, p) => c + p, 0) / excercises.length;
  return {
    periodLength,
    trainingDays,
    target,
    average,
    success: average >= target,
    ...rateExercise(average, target)
  };
};

if (process.argv.length > 2) {
  try {
    const { target, values } = parseArgs(process.argv);
    console.log(calculateExercises(values, target));
  } catch (e) {
    if (e instanceof Error) {
      console.log('Error:', e.message);
    } else {
      throw e;
    }
  }
}

export default calculateExercises;