function stringifyObject(obj) {
  for (var key in obj) {
    if (typeof obj[key] === "object") {
      obj[key] = stringifyObject(obj[key]);
    } else {
      obj[key] = String(obj[key]);
    }
  }
  return obj;
}

export default stringifyObject;
