module.exports = {
  PORT: 5000,
  DATA_DIR: 'data',
  FILE_ENCODING: 'utf-8',
};

const { doesFileExist, writeFile, mkdir } = require('../utils/file');

const makeDataFiles = async () => {
  // if data dir doesn't exist make it
  if (!doesFileExist('')) {
    await mkdir('');
  }
  if (!doesFileExist('posts.json')) {
    await writeFile('posts.json', []);
  }
  if (!doesFileExist('users.json')) {
    await writeFile('users.json', []);
  }
};

makeDataFiles();
