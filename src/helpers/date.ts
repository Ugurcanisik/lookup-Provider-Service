import moment from 'moment-timezone';

const defaultTimeZone = 'Europe/Istanbul';

moment.tz.setDefault(defaultTimeZone);

const nowDate = () => moment();

const dateFormatter = (date: Date, format: string) => moment(date).format(format);

const dateAddMinutes = (date: Date, i: number, format = '') => moment(date).add(i, 'm').format(format);

const nowDateWithFormat = (format: string) => moment().format(format);

const nowDateWithToDate = () => moment().toDate();

const addDate = (date: Date, i: number) => moment(date).add(i, 'd');

export { nowDate, dateFormatter, dateAddMinutes, nowDateWithFormat, nowDateWithToDate, addDate };
