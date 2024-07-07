export const dateTimeFormat = (date) => {
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export const hourTimeFormat = (date) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  localDate.setHours(localDate.getHours() + 1);

  const day = localDate.getDate().toString().padStart(2, "0");
  const month = (localDate.getMonth() + 1).toString().padStart(2, "0");
  const year = localDate.getFullYear();
  const hours = localDate.getHours().toString().padStart(2, "0");
  const minutes = localDate.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

