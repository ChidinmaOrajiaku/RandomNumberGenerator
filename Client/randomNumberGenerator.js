const generateNumbers = (amountOfNumbers) => {
  const generatedNumbers = new Set();

  if (!amountOfNumbers) {
    amountOfNumbers = 10;
  } else if (!Number(amountOfNumbers) || amountOfNumbers % 1 !== 0) {
    return {
      message: 'Please input a valid number',
    };
  }

  for (let i = 0; i < amountOfNumbers; i += 1) {
    const numbersGenerated = String(Math.floor(Math.random() * 900000000) + 100000000);
    const addZeroToNumbers = numbersGenerated.padStart(10, '0');

    generatedNumbers.add(addZeroToNumbers);
  }

  const sortedNumbers = [...generatedNumbers].sort();


  return {
    sortedNumbers,
    maxNumber: sortedNumbers[sortedNumbers.length - 1],
    minNumber: sortedNumbers[0],
  };
};

export default generateNumbers;
