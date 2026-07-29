import { Outlet } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';

export const Layout = () => {
  return (
    <div className="app-container">
      <main className="main-content">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};
