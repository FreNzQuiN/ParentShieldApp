import { DAYS, MONTHS } from '@/constants/date';
import moment from 'moment';

export const getFormattedDateIndonesia = (date: string): string => {
  // format date to date like "Rabu, 25 Mei 2023 13:00 WIB"
  const hari = DAYS['Indonesia'];
  const bulan = MONTHS['Indonesia'];
  // Waktu 13:00 WIB
  const waktu = moment(date).format('HH:mm');

  const momentDate = moment(date).format('YYYY-MM-DD');
  return `${hari[moment(momentDate).day()]}, ${momentDate.split('-')[2]} ${
    bulan[moment(momentDate).month()]
  } ${momentDate.split('-')[0]} ${waktu} WIB`;
};
