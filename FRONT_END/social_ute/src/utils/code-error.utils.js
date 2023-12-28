export const checkCodeInArray = (array = [], code) => {
  if (!array || !code) return;

  const findCode = array.find((obj) => obj.code === code);

  return findCode ? findCode.label : "Lỗi không xác định.";
};
