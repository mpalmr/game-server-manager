import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeView from './home';
import GamesView from './games';

const Views: FC = function Views() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/games" element={<GamesView />} />
    </Routes>
  );
};

export default Views;
