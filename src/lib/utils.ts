import { type ClassValue, clsx } from 'clsx';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (date: Date): string => {
  const currentDate = moment().startOf('day');
  const targetDate = moment(date);
  const formatedTargetDate = moment(date, 'YYYY-MM-DD').startOf('day');

  const diffInDays = moment.duration(currentDate.diff(formatedTargetDate)).asDays();

  if (diffInDays === 0) {
    return targetDate.format('HH:mm');
  } else if (diffInDays >= 1 && diffInDays < 4) {
    return targetDate.format('ddd');
  } else if (diffInDays >= 4 && diffInDays < 30) {
    return targetDate.format('D/M');
  } else {
    return targetDate.format('DD/MM/YYYY');
  }
};
