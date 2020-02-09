import moment from 'moment';

export const generateString = (quantity) => {
  let rnd = ``;

  while (rnd.length < quantity) {
    rnd += Math.random().toString(36).substring(2);
  }

  return rnd.substring(0, quantity);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatDateTime = (date) => {
  return moment(date).format(`YYYY/MM/DD HH:MM`);
};

export const isThisTimeRange = (date, range) => {
  const todayDate = new Date();

  const firstDate = moment(date);
  const secondDate = moment(todayDate);

  return firstDate.diff(secondDate, range) === 0;
};
