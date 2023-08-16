const getHigestValue = (arrays) => {
  const values = [];
  arrays.forEach((array) => {
    const secondValue = array[1];
    if (secondValue) values.push(secondValue);
  });

  return Math.ceil(values.reduce((max, current) => Math.max(max, current)));
};

export default getHigestValue;
