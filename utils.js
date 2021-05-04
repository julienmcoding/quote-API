let quoteIdCounter = 13;

const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
};

const createElement = (elementType, queryArguments) => {
  if (queryArguments.hasOwnProperty('quote') &&
      queryArguments.hasOwnProperty('person') &&
      queryArguments.hasOwnProperty('year')) {
        quoteIdCounter += 1;
        let currentId = quoteIdCounter;
    return {
      'id': currentId,
      'quote': queryArguments.quote,
      'person':  queryArguments.person,
      'year': queryArguments.year
    };
  } else {
    return false;
  }
};

const getIndexById = (id, elementList) => {
  return elementList.findIndex((element) => {
    return element.id === Number(id);
  });
};

const updateElement = (id, queryArguments, elementList) => {
  const elementIndex = getIndexById(id, elementList);
  if (elementIndex === -1) {
    throw new Error('updateElement must be called with a valid id parameter');
  };
  if (queryArguments.id) {
    queryArguments.id = Number(queryArguments.id);
  };
  Object.assign(elementList[elementIndex], queryArguments);
  return elementList[elementIndex];
};

module.exports = {
  getRandomElement, 
  createElement,
  getIndexById,
  updateElement
};
