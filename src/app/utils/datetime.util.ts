import moment from 'moment';
import {khmerDays, khmerMonths} from '../constants/date';

const allShortMonthNames = moment.monthsShort();
const getRelativeTime = (dateTime: string | Date) => moment(dateTime).fromNow();
const formatDateTime = (dateTime: string | Date, format: string) => moment(dateTime).format(format);

const toKhmerDate = (dateString: string): string => {
  const date = new Date(dateString);

  const dayName = khmerDays[date.getDay()];
  const day = date.getDate();
  const monthName = khmerMonths[date.getMonth()];
  const year = date.getFullYear();

  const khmerDigits = ['០','១','២','៣','៤','៥','៦','៧','៨','៩'];
  const toKhmerNumber = (num: number) =>
    num.toString().split('').map(d => khmerDigits[+d]).join('');

  return `${dayName} ទី${toKhmerNumber(day)} ខែ${monthName} ឆ្នាំ${toKhmerNumber(year)}`;
}

export {toKhmerDate, allShortMonthNames, getRelativeTime, formatDateTime}
