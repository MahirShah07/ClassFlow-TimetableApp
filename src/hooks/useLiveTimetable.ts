import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { Lecture } from '../types';

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

export const useLiveTimetable = () => {
  const [currentTime, setCurrentTime] = useState(() => {
    const mockTime = import.meta.env.VITE_MOCK_TIME;
    return mockTime ? dayjs(mockTime) : dayjs();
  });
  
  const { lectures } = useSelector((state: RootState) => state.timetable);
  const { autoRefresh } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    if (!autoRefresh) return;
    
    const mockTime = import.meta.env.VITE_MOCK_TIME;
    let elapsedSeconds = 0;
    
    const interval = setInterval(() => {
      if (mockTime) {
        elapsedSeconds++;
        setCurrentTime(dayjs(mockTime).add(elapsedSeconds, 'second'));
      } else {
        setCurrentTime(dayjs());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const currentDay = currentTime.format('dddd');
  const todayLectures = lectures.filter(l => l.day === currentDay).sort((a, b) => {
      const aTime = dayjs(a.startTime, 'HH:mm');
      const bTime = dayjs(b.startTime, 'HH:mm');
      return aTime.valueOf() - bTime.valueOf();
  });

  let currentLecture: Lecture | null = null;
  let nextLecture: Lecture | null = null;
  
  for (let i = 0; i < todayLectures.length; i++) {
    const lecture = todayLectures[i];
    const startTime = dayjs(lecture.startTime, 'HH:mm').year(currentTime.year()).month(currentTime.month()).date(currentTime.date());
    const endTime = dayjs(lecture.endTime, 'HH:mm').year(currentTime.year()).month(currentTime.month()).date(currentTime.date());

    if (currentTime.isBetween(startTime, endTime, 'minute', '[)')) {
      currentLecture = lecture;
      nextLecture = todayLectures[i + 1] || null;
      break;
    } else if (currentTime.isBefore(startTime)) {
      nextLecture = lecture;
      break;
    }
  }

  // Calculate remaining time
  let remainingTimeMs = 0;
  if (currentLecture) {
    const endTime = dayjs(currentLecture.endTime, 'HH:mm').year(currentTime.year()).month(currentTime.month()).date(currentTime.date());
    remainingTimeMs = endTime.diff(currentTime);
  } else if (nextLecture) {
    const startTime = dayjs(nextLecture.startTime, 'HH:mm').year(currentTime.year()).month(currentTime.month()).date(currentTime.date());
    remainingTimeMs = startTime.diff(currentTime);
  }
  
  const remainingMinutes = Math.max(0, Math.ceil(remainingTimeMs / 60000));

  return {
    currentTime,
    currentDay,
    todayLectures,
    currentLecture,
    nextLecture,
    remainingMinutes
  };
};
