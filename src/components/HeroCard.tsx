import { motion } from 'framer-motion';
import { Progress, Tag } from 'antd';
import { EnvironmentOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import type { Lecture } from '../types';
import dayjs from 'dayjs';
import './HeroCard.css';

interface HeroCardProps {
  currentLecture: Lecture | null;
  nextLecture: Lecture | null;
  remainingMinutes: number;
}

export const HeroCard = ({ currentLecture, nextLecture, remainingMinutes }: HeroCardProps) => {
  if (currentLecture) {
    const startTime = dayjs(currentLecture.startTime, 'HH:mm');
    const endTime = dayjs(currentLecture.endTime, 'HH:mm');
    const totalDuration = endTime.diff(startTime, 'minute');
    const elapsed = totalDuration - remainingMinutes;
    const progressPercent = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));

    const isBreak = currentLecture.type === 'Break';
    const cardClass = isBreak ? 'break' : 'live';

    return (
      <motion.div 
        className={`hero-card glass ${cardClass}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hero-header">
          <Tag color={isBreak ? 'warning' : 'processing'} icon={!isBreak && <div className="live-dot" />}>
            {isBreak ? 'BREAK TIME' : 'LIVE NOW'}
          </Tag>
          <span className="time-badge">{currentLecture.startTime} - {currentLecture.endTime}</span>
        </div>
        
        <h2 className="subject-title">{currentLecture.subject}</h2>
        
        {!isBreak ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
            <div className="info-row" style={{ margin: 0 }}>
              <UserOutlined />
              <span>{currentLecture.faculty}</span>
            </div>
            {currentLecture.room !== '-' && (
              <div className="info-row" style={{ margin: 0 }}>
                <EnvironmentOutlined />
                <span>{currentLecture.room} <span style={{ color: 'var(--text-secondary)' }}>(Floor {currentLecture.floor})</span></span>
              </div>
            )}
          </div>
        ) : (
          <div style={{ marginBottom: '32px', fontSize: '16px', opacity: 0.9 }}>
            Enjoy your break!
          </div>
        )}

        <div style={{ marginBottom: '32px' }}>
          <div className="progress-text">
            <span>Remaining</span>
            <span className="remaining-time">{remainingMinutes} min</span>
          </div>
          <Progress 
            percent={progressPercent} 
            showInfo={false} 
            strokeColor="var(--primary-color)"
            trailColor="var(--border-color)"
            size="small"
          />
        </div>

        {/* Up Next Section placed at the bottom inside a subtle inner card */}
        {nextLecture && (
          <div 
            style={{ 
              background: 'var(--card-bg)', 
              border: '1px solid var(--border-color)', 
              padding: '16px', 
              borderRadius: '16px', 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Up Next</div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>{nextLecture.subject}</div>
              <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                <span>{nextLecture.startTime}</span>
                {nextLecture.room !== '-' && (
                  <>
                    <span>•</span>
                    <span>{nextLecture.room} (Floor {nextLecture.floor})</span>
                  </>
                )}
              </div>
            </div>
            <div style={{ background: 'rgba(22, 119, 255, 0.1)', color: '#1677ff', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowRightOutlined />
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  // Free period
  return (
    <motion.div 
      className="hero-card glass free"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hero-header">
        <Tag color="success">🎉 Free Period</Tag>
      </div>
      
      {nextLecture ? (
        <>
          <h2 className="subject-title">Next: {nextLecture.subject}</h2>
          <div className="info-row">
            <span>Starts in {remainingMinutes} minutes</span>
          </div>
          {nextLecture.room !== '-' && (
            <div className="info-row">
              <EnvironmentOutlined />
              <span>{nextLecture.room} <span style={{ color: 'var(--text-secondary)' }}>(Floor {nextLecture.floor})</span></span>
            </div>
          )}
        </>
      ) : (
        <h2 className="subject-title">No more classes today!</h2>
      )}
    </motion.div>
  );
};
