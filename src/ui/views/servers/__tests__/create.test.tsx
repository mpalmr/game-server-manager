import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
import * as reactRouterDom from 'react-router-dom';
import { screen, render } from '../../../_test-utils';
import ServerCreateView from '../create';
import { ServersProvider } from '../../../providers/servers';
import type { Server, ServerEditableFields } from '../../../../store';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn<(url: string) => void, []>(),
}));

jest.mock('../../../../store');
jest.mock('../../../components/server-form');

const mockNavigate = jest.fn();
const mockGsm = {
  getServers: jest.fn<Promise<Server[]>, []>(),
  createServer: jest.fn<Promise<Server>, [ServerEditableFields]>(),
};

beforeEach(() => {
  jest.spyOn(reactRouterDom, 'useNavigate').mockReturnValue(mockNavigate);
  Object.assign(window, { gsm: mockGsm });
});

afterAll(() => {
  window.gsm = undefined;
});

test('successful submission', async () => {
  (reactRouterDom.useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  mockGsm.getServers.mockResolvedValue([]);
  mockGsm.createServer.mockResolvedValue({
    id: 'new-mock-id',
    name: 'mockName',
    host: 'mock.example.com',
    sshPort: 22,
    username: 'mockuser',
    games: [],
    createdAt: new Date('2013-08-08'),
  });

  render(
    <ServersProvider>
      <ServerCreateView />
    </ServersProvider>,
  );

  expect(mockNavigate).not.toHaveBeenCalled();
  expect(mockGsm.createServer).not.toHaveBeenCalled();
  await userEvent.click(screen.getByText('Submit'));
  expect(mockNavigate).toHaveBeenCalledWith('/');
  expect(mockGsm.createServer).toHaveBeenCalledWith({
    name: 'mockName',
    host: 'mock.example.com',
    sshPort: 22,
    username: 'mockuser',
  });
});
