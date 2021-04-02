export function createFBArray(docs) {
  let newArray = [];
  docs.forEach((doc) => {
    newArray = [...newArray, { id: doc.id, ...doc.data() }];
  });
  return newArray;
}

export function createFBObject(data) {
  let objectData = {};
  data.forEach((doc) => {
    objectData = {
      ...objectData,
      [doc.id]: doc.data(),
    };
  });
  return objectData;
}

export function getUnique(array) {
  const uniqueArray = Array.from(new Set(array));
  return uniqueArray;
}
