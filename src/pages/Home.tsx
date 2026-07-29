import { useLiveTimetable } from '../hooks/useLiveTimetable';
import { HeroCard } from '../components/HeroCard';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

export default function Home() {
  const { 
    currentTime, 
    currentLecture, 
    nextLecture, 
    remainingMinutes,
    todayLectures
  } = useLiveTimetable();
  
  const formattedDate = currentTime.format('dddd, MMMM D');
  const formattedTime = currentTime.format('h:mm A');
  
  // Calculate today's progress
  let completedCount = 0;
  todayLectures.forEach(l => {
    const end = dayjs(l.endTime, 'HH:mm').year(currentTime.year()).month(currentTime.month()).date(currentTime.date());
    if (currentTime.isAfter(end)) {
      completedCount++;
    }
  });
  
  const totalClasses = todayLectures.length;
  const classesLeft = totalClasses - completedCount - (currentLecture ? 1 : 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container"
    >
      <header className="page-header" style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 4px 0' }}>{formattedTime}</h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', margin: 0 }}>{formattedDate}</p>
      </header>

      <HeroCard 
        currentLecture={currentLecture}
        nextLecture={nextLecture}
        remainingMinutes={remainingMinutes}
      />

      {todayLectures.length > 0 && (
        <div className="stats-container" style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div className="stat-card glass" style={{ flex: 1, padding: '16px', borderRadius: '16px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-secondary)', fontSize: '13px' }}>Completed</h4>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>{completedCount} / {totalClasses}</div>
          </div>
          <div className="stat-card glass" style={{ flex: 1, padding: '16px', borderRadius: '16px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-secondary)', fontSize: '13px' }}>Remaining</h4>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>{classesLeft > 0 ? classesLeft : '0'}</div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
