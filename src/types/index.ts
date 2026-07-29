export interface Lecture {
  id: string;
  subject: string;
  faculty: string;
  startTime: string; // HH:mm format, e.g. "09:00"
  endTime: string;   // HH:mm format, e.g. "10:00"
  room: string;
  floor: number;
  building: string;
  type: string;
  day: string; // e.g. "Monday"
  semester: string;
  division: string;
  color?: string; // Optional color scheme
}

export interface TimetableData {
  lectures: Lecture[];
}
