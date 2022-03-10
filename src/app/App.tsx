import React, { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home';
import UserFull from '../components/user/user-full';

const App:FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user/:name" element={<UserFull />} />
    </Routes>
  </Router>
);

export default App;
