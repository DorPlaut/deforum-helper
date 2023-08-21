const getHigestValue = (arrays) => {
  const values = [];
  arrays.forEach((array) => {
    array.forEach((value) => {
      const secondValue = value[1];
      if (secondValue > 0) values.push(secondValue);
      if (secondValue < 0) values.push(-secondValue);
    });
  });
  return Math.ceil(values.reduce((max, current) => Math.max(max, current)));
};

export default getHigestValue;
