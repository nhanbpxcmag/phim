import { isValid, parseISO } from 'date-fns';

export const isNullUndefined = (value) => {
  return value === null || value === '' || value === undefined ? true : false;
};

export const stringToDate = (value: string): Date => {
  const time = parseISO(value, { additionalDigits: 0 });
  if (isValid(time)) {
    return time;
  }
  return new Date();
};
