import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { ScheduleCard } from '../components/ScheduleCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Segmented } from 'antd';
import dayjs from 'dayjs';
import './Week.css';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function Week() {
  const [selectedDay, setSelectedDay] = useState(dayjs().format('dddd'));
  const activeDay = days.includes(selectedDay) ? selectedDay : 'Monday';
  
  const { lectures } = useSelector((state: RootState) => state.timetable);

  const dayLectures = lectures.filter(l => l.day === activeDay).sort((a, b) => {
    const aTime = dayjs(a.startTime, 'HH:mm');
    const bTime = dayjs(b.startTime, 'HH:mm');
    return aTime.valueOf() - bTime.valueOf();
  });

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="page-container"
    >
      <header className="page-header" style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 16px 0' }}>Weekly Schedule</h1>
        
        <div className="segmented-wrapper">
          <Segmented 
            options={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']} 
            value={activeDay.substring(0, 3)}
            onChange={(value) => {
              const fullDay = days.find(d => d.startsWith(value as string));
              if (fullDay) setSelectedDay(fullDay);
            }}
            block
            size="large"
          />
        </div>
      </header>

      <div className="schedule-list">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {dayLectures.length > 0 ? (
              dayLectures.map((lecture, index) => (
                <ScheduleCard 
                  key={`${lecture.id}-${index}`} 
                  lecture={lecture} 
                  status="upcoming" // In week view, all show as upcoming for simplicity unless it's today
                />
              ))
            ) : (
              <div className="empty-state glass" style={{ padding: '40px 20px', textAlign: 'center', borderRadius: '20px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>Free Day</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>No classes scheduled for {activeDay}.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
