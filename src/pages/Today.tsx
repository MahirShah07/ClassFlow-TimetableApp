import { useLiveTimetable } from '../hooks/useLiveTimetable';
import { ScheduleCard } from '../components/ScheduleCard';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

export default function Today() {
  const { todayLectures, currentTime, currentLecture } = useLiveTimetable();

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="page-container"
    >
      <header className="page-header" style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 4px 0' }}>Today's Schedule</h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0 }}>
          {todayLectures.length} classes scheduled
        </p>
      </header>

      <div className="schedule-list">
        {todayLectures.length > 0 ? (
          todayLectures.map((lecture, index) => {
            let status: 'completed' | 'current' | 'upcoming' = 'upcoming';
            
            const end = dayjs(lecture.endTime, 'HH:mm').year(currentTime.year()).month(currentTime.month()).date(currentTime.date());

            if (currentLecture && currentLecture.id === lecture.id) {
              status = 'current';
            } else if (currentTime.isAfter(end)) {
              status = 'completed';
            }

            return (
              <ScheduleCard 
                key={`${lecture.id}-${index}`} 
                lecture={lecture} 
                status={status} 
              />
            );
          })
        ) : (
          <div className="empty-state glass" style={{ padding: '40px 20px', textAlign: 'center', borderRadius: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>No Classes Today!</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Enjoy your free time.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
