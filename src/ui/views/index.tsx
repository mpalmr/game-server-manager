import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import SplashView from './splash';
import ServerListView from './server';
import CreateServerView from './server/create';
import EditServerView from './server/edit';

const Views: FC = function Views() {
  return (
    <Routes>
      <Route path="/" element={<SplashView />} />
      <Route path="/server" element={<ServerListView />} />
      <Route path="/server/create" element={<CreateServerView />} />
      <Route path="/server/:id/edit" element={<EditServerView />} />
    </Routes>
  );
};

export default Views;
