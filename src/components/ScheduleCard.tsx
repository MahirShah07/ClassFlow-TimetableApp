import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import type { Lecture } from '../types';
import { EnvironmentOutlined, ClockCircleOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import './ScheduleCard.css';

interface ScheduleCardProps {
  lecture: Lecture;
  status: 'completed' | 'current' | 'upcoming';
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ lecture, status }) => {
  const [expanded, setExpanded] = useState(false);

  const start = dayjs(lecture.startTime, 'HH:mm');
  const end = dayjs(lecture.endTime, 'HH:mm');
  const durationMins = end.isValid() && start.isValid() ? end.diff(start, 'minute') : 0;
  const durationStr = durationMins >= 60 ? `${Math.floor(durationMins / 60)}h ${durationMins % 60 > 0 ? (durationMins % 60) + 'm' : ''}` : `${durationMins} min`;

  return (
    <motion.div 
      className={`schedule-card ${status} glass`}
      onClick={() => setExpanded(!expanded)}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="schedule-card-header">
        <div className="time-col">
          <span className="start-time">{lecture.startTime}</span>
          <span className="end-time">{lecture.endTime}</span>
        </div>
        <div className="info-col">
          <h3 className="subject-name">{lecture.subject}</h3>
          {!(lecture.type === 'Break' && lecture.room === '-') && (
            <div className="room-info">
              <EnvironmentOutlined style={{ marginRight: 6 }} />
              {lecture.room} <span style={{ color: 'gray', marginLeft: 4 }}>(Floor {lecture.floor})</span>
            </div>
          )}
        </div>
        <div className="status-indicator">
          {status === 'current' && <div className="current-pulse" />}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            className="schedule-card-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="detail-grid">
              {lecture.faculty !== '-' && (
                <div className="detail-item">
                  <UserOutlined />
                  <div>
                    <span className="detail-label">Faculty</span>
                    <span className="detail-value">{lecture.faculty}</span>
                  </div>
                </div>
              )}
              <div className="detail-item">
                <FileTextOutlined />
                <div>
                  <span className="detail-label">Type</span>
                  <span className="detail-value">{lecture.type}</span>
                </div>
              </div>
              {lecture.room !== '-' && (
                <div className="detail-item">
                  <EnvironmentOutlined />
                  <div>
                    <span className="detail-label">Location</span>
                    <span className="detail-value">{lecture.room} <span style={{ color: 'gray' }}>(Floor {lecture.floor})</span></span>
                  </div>
                </div>
              )}
              <div className="detail-item">
                <ClockCircleOutlined />
                <div>
                  <span className="detail-label">Duration</span>
                  <span className="detail-value">{durationStr}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
