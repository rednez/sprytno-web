import dayjs from 'dayjs';

export const fullDate = (date: Date) => dayjs(date).format('DD.MM.YYYY, HH:mm');
