export const ObjectToString = (obj) => {
  let result_string = " ";
  let result = [];
  const keys = Object.keys(obj);
  const value = Object.values(obj);
  for (let i = 0; i < keys.length; i++) {
    const s = keys[i] + "=" + '"' + value[i] + '"';
    result[i] = s;
    result_string += result[i] + " ";
  }
  return result_string;
};
