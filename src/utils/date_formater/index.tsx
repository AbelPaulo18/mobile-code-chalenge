import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

export function timeFromNow(date: string): string {
  return dayjs(date).fromNow();
}
