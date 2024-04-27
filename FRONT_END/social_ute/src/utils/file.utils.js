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

export const parseBitesToMegoBites = (bites) => {
  return bites / 1024 / 1024;
};

export const checkFileMaxSize = (file, Maxsize) => {
  if (!file.size) return false;

  const size = parseBitesToMegoBites(file.size);

  return size <= Maxsize;
};

export const checkFileExtension = (file, extensions) => {
  const fileExtension = file.name.split(".").pop();
  if (!fileExtension) return false;
  return extensions.includes(fileExtension);
};
