const fs = require('fs');
const path = require('path');
const { DATA_DIR, FILE_ENCODING } = require('../config');
const callAsPromise = require('./callAsPromise');

const basePath = path.join(__dirname, '..', '..', DATA_DIR); // project root dir

const readFile = async (filename) => {
  return JSON.parse(
    await callAsPromise(
      fs.readFile,
      path.join(basePath, filename),
      FILE_ENCODING
    )
  );
};

const writeFile = (filename, content) => {
  return callAsPromise(
    fs.writeFile,
    path.join(basePath, filename),
    JSON.stringify(content)
  );
};

const doesFileExist = (filename) =>
  fs.existsSync(path.join(basePath, filename));

const mkdir = (dir) => {
  return callAsPromise(fs.mkdir, path.join(basePath, dir));
};

module.exports = { readFile, writeFile, doesFileExist, mkdir };
