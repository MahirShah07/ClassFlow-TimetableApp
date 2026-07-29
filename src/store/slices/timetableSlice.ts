import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Lecture, TimetableData } from '../../types';
import monday from '../../data/monday.json';
import tuesday from '../../data/tuesday.json';
import wednesday from '../../data/wednesday.json';
import thursday from '../../data/thursday.json';
import friday from '../../data/friday.json';

const allLectures: Lecture[] = [
  ...monday.lectures,
  ...tuesday.lectures,
  ...wednesday.lectures,
  ...thursday.lectures,
  ...friday.lectures,
] as Lecture[];

interface TimetableState {
  lectures: Lecture[];
  lastUpdated: string;
}

const initialState: TimetableState = {
  lectures: allLectures,
  lastUpdated: new Date().toISOString(),
};

const timetableSlice = createSlice({
  name: 'timetable',
  initialState,
  reducers: {
    setTimetable(state, action: PayloadAction<TimetableData>) {
      state.lectures = action.payload.lectures;
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const { setTimetable } = timetableSlice.actions;
export default timetableSlice.reducer;
