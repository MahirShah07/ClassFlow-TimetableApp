import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lecture } from '../types';
import './Subjects.css';

interface SubjectSummary {
  name: string;
  faculty: string;
  color?: string;
  totalLectures: number;
  lectures: Lecture[];
}

export default function Subjects() {
  const { lectures } = useSelector((state: RootState) => state.timetable);
  const [selectedSubject, setSelectedSubject] = useState<SubjectSummary | null>(null);

  const subjects = useMemo(() => {
    const summary: Record<string, SubjectSummary> = {};
    
    lectures.forEach(l => {
      if (!summary[l.subject]) {
        summary[l.subject] = {
          name: l.subject,
          faculty: l.faculty,
          color: l.color,
          totalLectures: 0,
          lectures: []
        };
      }
      summary[l.subject].totalLectures += 1;
      summary[l.subject].lectures.push(l);
    });

    return Object.values(summary);
  }, [lectures]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="page-container"
    >
      <header className="page-header" style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 4px 0' }}>Subjects</h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0 }}>
          {subjects.length} subjects in total
        </p>
      </header>

      <div className="subjects-grid">
        {subjects.map(subject => (
          <motion.div 
            key={subject.name}
            className="subject-card glass"
            onClick={() => setSelectedSubject(selectedSubject?.name === subject.name ? null : subject)}
            layout
          >
            <div className="subject-color-strip" style={{ backgroundColor: subject.color || 'var(--primary-color)' }} />
            <div className="subject-card-content">
              <h3 className="subject-title">{subject.name}</h3>
              <p className="subject-faculty">{subject.faculty}</p>
              <div className="subject-stats">
                <span className="stat-pill">{subject.totalLectures} lectures/week</span>
              </div>
            </div>

            <AnimatePresence>
              {selectedSubject?.name === subject.name && (
                <motion.div 
                  className="subject-expanded-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <h4 style={{ margin: '16px 0 8px 0', fontSize: '14px' }}>All Scheduled Classes</h4>
                  {subject.lectures.map(l => (
                    <div key={l.id} className="mini-schedule-item">
                      <span className="mini-day">{l.day.substring(0, 3)}</span>
                      <span className="mini-time">{l.startTime} - {l.endTime}</span>
                      <span className="mini-room">Room {l.room}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
