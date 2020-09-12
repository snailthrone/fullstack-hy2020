type Values = {
  height: number;
  weight: number
};

const parseArguments = (args: string[]): Values => {
  if (args.length < 4) {
    throw new Error('Not enough arguments');
  }
  if (args.length > 4) {
    throw new Error('Too many arguments');
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return { height: Number(args[2]), weight: Number(args[3]) };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2);
  if (bmi > 30) {
    return `Obese (${Math.round(bmi)})`;
  }
  if (bmi > 25) {
    return `Overweight (${Math.round(bmi)})`;
  }
  if (bmi > 18.5) {
    return `Normal (${Math.round(bmi)})`;
  }
  return `Underweight (${Math.round(bmi)})`;
};

if (process.argv.length > 2) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (e) {
    if (e instanceof Error) {
      console.log('Error:', e.message);
    } else {
      throw e;
    }
  }
}

export default calculateBmi;