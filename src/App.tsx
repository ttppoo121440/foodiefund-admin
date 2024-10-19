import { HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import News from '@/pages/News';

const App = () => {
  return (
    <HashRouter>
      <Dashboard>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="news" element={<News />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Dashboard>
    </HashRouter>
  );
};

export default App;
