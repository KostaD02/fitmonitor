import { Timestamps } from './timestamps';

export interface Calendar extends Timestamps {
  _id: string;
  name: string;
  ownerID: string;
  data: CalendarData;
}

export interface CalendarData {
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
}

export interface CalendarDataForm {
  [key: string]: string;
}

export type CalendarForm = Pick<Calendar, 'name'>;
