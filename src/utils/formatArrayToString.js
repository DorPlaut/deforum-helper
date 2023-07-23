const formatArrayToString = (arrays) => {
  const filteredArrays = arrays.filter((array) => array.length === 3);

  const formattedStrings = filteredArrays.map((array) => {
    const [firstValue, secondValue] = array;
    return `${firstValue}:(${secondValue})`;
  });
  return formattedStrings.join(', ');
};
export default formatArrayToString;
