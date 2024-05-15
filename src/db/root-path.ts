import path from 'node:path';
import getAppDataPath from 'appdata-path';

const rootPath = path.join(getAppDataPath(), 'game-server-manager');

export default rootPath;
