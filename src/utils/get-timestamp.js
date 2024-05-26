function getTimeStamp() {
  const now = new Date().toISOString();
  return now.replace("T", "").replace("Z", "");
}

export default getTimeStamp;
