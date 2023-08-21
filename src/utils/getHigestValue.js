const getHigestValue = (arrays) => {
  const values = [];
  arrays.forEach((array) => {
    array.forEach((value) => {
      const secondValue = value[1];
      if (secondValue > 0) values.push(secondValue);
      if (secondValue < 0) values.push(-secondValue);
    });
  });
  if (values.length > 0)
    return Math.ceil(values.reduce((max, current) => Math.max(max, current)));
  else return 10;
};

export default getHigestValue;
