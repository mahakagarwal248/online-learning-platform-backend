import responseObjectClass from "../helpers/responseObjectClass";

import logger from "../helpers/logger";

const newResponseObject = new responseObjectClass();

logger.info("working health check");
async function checkConnection(req, res) {
  const returnObj = newResponseObject.create({
    code: 200,
    success: true,
    message: "Online Learning platform Service's health is in working state :)",
  });
  res.send(returnObj);
}

export default {
  checkConnection,
};
