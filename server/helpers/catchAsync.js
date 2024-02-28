import logger from "./logger";

export default (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      logger.error(
        `User - ${
          JSON.stringify(req.user) || "Anonymous"
        }, Headers - ${JSON.stringify(req.headers)}, Body - ${JSON.stringify(
          req.body
        )}, Error - ${JSON.stringify(error)}`
      );
      next(error);
    });
  };
};
