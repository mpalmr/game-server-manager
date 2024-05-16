import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeView from './home';
import CreateServerView from './server/create';

const Views: FC = function Views() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/server/create" element={<CreateServerView />} />
    </Routes>
  );
};

export default Views;
