const model = require('../models/model');
const sendResponse = require('../utils/sendResponse');

const requireEntityExistence = (entity) => {
  return async (req, res, next) => {
    const entityId = parseInt(req.params.id);

    // make sure that entity id is a number
    if (isNaN(entityId)) {
      sendResponse(res, 400, { error: `${entity} id should be a number` }); // send 400 error
      return;
    }

    // check if record exists and send error if it doesn't
    if (await model.doesRecordExist(entity, entityId)) {
      next();
      return;
    }
    sendResponse(res, 404, { error: `${entity} does not exist` }); // send 404 error
  };
};

module.exports = requireEntityExistence;
