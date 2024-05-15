import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeView from './home';
import ServersView from './servers';

const Views: FC = function Views() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/games" element={<ServersView />} />
    </Routes>
  );
};

export default Views;
