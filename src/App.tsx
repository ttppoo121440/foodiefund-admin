import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import BlockList from '@/pages/BlockList';

const App = () => {
  const basename =
    import.meta.env.MODE === 'production' ? '/foodiefund-admin' : '/';
  return (
    <Router basename={basename}>
      <Dashboard>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="blockList" element={<BlockList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Dashboard>
    </Router>
  );
};

export default App;
