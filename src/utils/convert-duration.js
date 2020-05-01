import moment from "moment";

const convertDuration = (allMinutes) => {
  const duration = moment.duration(allMinutes, `minutes`);

  const hours = duration.hours();
  const minutes = duration.minutes();

  if (hours === 0) {
    return `${minutes}m`;
  }

  return `${hours}h ${minutes}m`;
};

export {convertDuration};
