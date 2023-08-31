// original url error
const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
};


// error handler
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? 200 || 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const errorHandlingMiddleware = { notFound, errorHandler };
module.exports = errorHandlingMiddleware;


// we didnt use it until now