import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClockCircleOutlined } from '@ant-design/icons';
import './FloatingCountdown.css';

interface FloatingCountdownProps {
  remainingMinutes: number;
  visible: boolean;
}

export const FloatingCountdown: React.FC<FloatingCountdownProps> = ({ remainingMinutes, visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="floating-countdown glass"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <ClockCircleOutlined />
          <span>Ends in <strong>{remainingMinutes} min</strong></span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
