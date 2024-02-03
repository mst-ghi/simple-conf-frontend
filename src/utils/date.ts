import dayjs, { ManipulateType } from 'dayjs';

import calendar from 'dayjs/plugin/calendar';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(calendar);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

const TimeFormats = {
  default: 'llll', // October 12, 2021 12:53 PM
  short: 'MMM DD - HH:mm',
  'full-date-time': 'dddd, MMMM DD, YYYY HH:mm A', // Tuesday, October 12, 2021 12:53 PM
  'normal-date': 'MMMM DD, YYYY', // October 12, 2021
  'normal-date-time': 'MMMM DD, YYYY hh:mm A', // October 12, 2021 05:12 PM
  'json-custom-date-time-string': 'YYYY-MM-DD HH:mm',
  'month-and-day': 'MMMM DD',
  'calendar-day': 'YYYY-MM-DD',
  'time-12h': 'hh:mm A',
  'time-24h': 'HH:mm',
};

export const dateView = (
  date: string | Date,
  format: keyof typeof TimeFormats = 'default',
): string => {
  if (!date) return '';
  return dayjs(date).format(TimeFormats[format]);
};

export const showDateFromNow = (date: string): string => {
  return dayjs(date).calendar(null, { sameElse: 'MMMM DD, YYYY hh:mm A' });
};

type AddTimeUnits =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year';

export const addToDate = (
  dateValue: Date | string,
  value: number | string,
  unit: AddTimeUnits = 'second',
) => {
  return dayjs(dateValue)
    .add(+value, unit as ManipulateType)
    .toDate();
};

export const addTimeToNow = (
  value: number | string,
  unit: AddTimeUnits = 'second',
) => {
  return dayjs()
    .add(+value, unit as ManipulateType)
    .format();
};
