import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeView from './home';

const Views: FC = function Views() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
    </Routes>
  );
};

export default Views;
