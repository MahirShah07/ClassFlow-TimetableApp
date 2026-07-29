import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { 
  toggleTheme, 
  toggleAutoRefresh, 
  toggleNotifications, 
  toggleTimeFormat 
} from '../store/slices/settingsSlice';
import { motion } from 'framer-motion';
import { Switch } from 'antd';
import { 
  BgColorsOutlined, 
  SyncOutlined, 
  BellOutlined, 
  ClockCircleOutlined
} from '@ant-design/icons';
import './Settings.css';

export default function Settings() {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="page-container"
    >
      <header className="page-header" style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 4px 0' }}>Settings</h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0 }}>
          Customize your experience
        </p>
      </header>

      <div className="settings-section glass">
        <h3 className="settings-title">Preferences</h3>
        
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-icon"><BgColorsOutlined /></div>
            <span>Dark Mode</span>
          </div>
          <Switch checked={settings.theme === 'dark'} onChange={() => dispatch(toggleTheme())} />
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-icon"><SyncOutlined /></div>
            <span>Auto Refresh</span>
          </div>
          <Switch checked={settings.autoRefresh} onChange={() => dispatch(toggleAutoRefresh())} />
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-icon"><BellOutlined /></div>
            <span>Notifications</span>
          </div>
          <Switch checked={settings.notificationsEnabled} onChange={() => dispatch(toggleNotifications())} />
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-icon"><ClockCircleOutlined /></div>
            <span>24-Hour Format</span>
          </div>
          <Switch checked={settings.timeFormat24h} onChange={() => dispatch(toggleTimeFormat())} />
        </div>
      </div>
    </motion.div>
  );
}
