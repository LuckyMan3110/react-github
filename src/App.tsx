import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import User from './pages/User/User';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user/:id' element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
