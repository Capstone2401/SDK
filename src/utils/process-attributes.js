function stringifyObject(obj) {
  const newObj = {};
  for (const key in obj) {
    if (
      typeof obj[key] === "number" ||
      typeof obj[key] === "boolean" ||
      typeof obj[key] === "string"
    ) {
      newObj[key] = String(obj[key]);
    } else {
      return new Error("attribute value must string, number, or boolean");
    }
  }
  return newObj;
}

export default stringifyObject;
