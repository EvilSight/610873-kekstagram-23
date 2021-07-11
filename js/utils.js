const getRandomInt = (minValue, maxValue) => {
  let absIntMinValue = Math.floor(Math.abs(minValue));
  let absIntMaxValue = Math.floor(Math.abs(maxValue));

  if (absIntMinValue > absIntMaxValue) {
    [absIntMaxValue, absIntMinValue] = [absIntMinValue, absIntMaxValue];
  }

  return (
    Math.floor(Math.random() * (absIntMaxValue - absIntMinValue + 1)) +
    absIntMinValue
  );
};

const checkMaxStringLength = (checkedString, maxStringLength) =>
  checkedString.length <= maxStringLength;

export {getRandomInt, checkMaxStringLength};
