export const formatDateAndTime = (timestamp) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1
  const day = date.getDate().toString().padStart(2, "0");
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  let amOrPm = "AM";
  if (hours >= 12) {
    amOrPm = "PM";
    hours = hours === 12 ? 12 : hours - 12;
  }
  hours = hours.toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${amOrPm}`;
};
