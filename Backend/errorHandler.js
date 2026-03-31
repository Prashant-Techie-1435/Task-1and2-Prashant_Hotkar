/**
 * middleware/errorHandler.js
 *
 * Global error-handling middleware.
 * Express recognises this as an error handler because it has 4 parameters: (err, req, res, next).
 * Any controller can trigger this by calling: next(error)
 */

const errorHandler = (err, req, res, next) => {
  console.error('\n🔴 Unhandled Error:');
  console.error(err.stack || err.message);

  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Internal Server Error. Please try again later.' : err.message,
    // Only show the stack trace in development mode
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
