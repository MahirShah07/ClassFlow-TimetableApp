import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme as antTheme } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Today from './pages/Today';
import Week from './pages/Week';
import Subjects from './pages/Subjects';
import Settings from './pages/Settings';

function App() {
  const { theme } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 16,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="today" element={<Today />} />
            <Route path="week" element={<Week />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
