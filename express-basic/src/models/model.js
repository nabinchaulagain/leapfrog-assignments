const { readFile, writeFile } = require('../utils/file');

const getEntityFile = (entity) => `${entity}s.json`;
const getLatestId = (entityData) => {
  const latestData = entityData[entityData.length - 1];

  return latestData ? latestData.id : 0;
};

module.exports = {
  create: async function (entity, data) {
    const entityData = await this.read(entity);
    const newRecord = { id: getLatestId(entityData) + 1, ...data };
    entityData.push(newRecord);
    await writeFile(getEntityFile(entity), entityData);

    return newRecord;
  },
  read: async function (entity) {
    const filename = getEntityFile(entity);
    const entityData = await readFile(filename);

    return entityData;
  },
  readOne: async function (entity, id) {
    const entityData = await this.read(entity);
    const record = entityData.find((record) => record.id === id);

    return record;
  },
  readWhere: async function (entity, key, val) {
    const entityData = await this.read(entity);
    const filteredData = entityData.filter((record) => record[key] === val);

    return filteredData;
  },
  update: async function (entity, data) {
    const entityData = await this.read(entity);
    const recordIdx = entityData.findIndex((record) => record.id === data.id);
    entityData[recordIdx] = { ...data };
    await writeFile(getEntityFile(entity), entityData);

    return entityData[recordIdx];
  },
  delete: async function (entity, id) {
    const entityData = await this.read(entity);
    const entitiesFiltered = entityData.filter((record) => record.id !== id);
    await writeFile(getEntityFile(entity), entitiesFiltered);
  },
};
