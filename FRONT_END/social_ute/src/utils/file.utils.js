export const handleConvertFileToUrlImage = (files) => {
  if (files && files.length > 0) {
    const arrImage = [];
    for (let i = 0; i < Object.keys(files).length; i++) {
      arrImage.push(URL.createObjectURL(files[i]));
    }
    return arrImage;
  }
  return [];
};

export const handleRevokeBlobUrl = (arrBlob) => {
  if (arrBlob) return;

  if (arrBlob.length > 0) {
    const arrImage = [];
    for (let i = 0; i < Object.keys(arrBlob).length; i++) {
      URL.revokeObjectURL(arrBlob[i]);
    }
    return arrImage;
  }

  if (arrBlob.length === 0) {
    URL.revokeObjectURL(arrBlob);
  }
};
