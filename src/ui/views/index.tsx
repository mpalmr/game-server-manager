import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import SplashView from './splash';
import ServerListView from './servers';
import CreateServerView from './servers/create';
import EditServerView from './servers/edit';
import ConnectServerView from './servers/connect';

const Views: FC = function Views() {
  return (
    <Routes>
      <Route path="/" element={<SplashView />} />
      <Route path="/servers" element={<ServerListView />} />
      <Route path="/servers/create" element={<CreateServerView />} />
      <Route path="/servers/:id/edit" element={<EditServerView />} />
      <Route path="/servers/:id/connect" element={<ConnectServerView />} />
    </Routes>
  );
};

export default Views;
