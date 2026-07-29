import { useNavigate, useLocation } from 'react-router-dom';
import { HomeOutlined, CalendarOutlined, ProfileOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import './BottomNavigation.css';

const navItems = [
  { path: '/', label: 'Home', icon: <HomeOutlined /> },
  { path: '/today', label: 'Today', icon: <CalendarOutlined /> },
  { path: '/week', label: 'Week', icon: <ProfileOutlined /> },
  { path: '/subjects', label: 'Subjects', icon: <AppstoreOutlined /> },
  { path: '/settings', label: 'Settings', icon: <SettingOutlined /> },
];

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bottom-nav glass">
      {navItems.map((item) => (
        <div 
          key={item.path} 
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <div className="nav-icon">{item.icon}</div>
          <div className="nav-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};
