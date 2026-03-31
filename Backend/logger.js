/**
 * middleware/logger.js
 *
 * Simple request logger.
 * Prints method, path, status code, and response time for every request.
 */

const logger = (req, res, next) => {
  const start = Date.now();

  // Hook into res.finish to log after response is sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor =
      res.statusCode >= 500 ? '\x1b[31m' :  // red   — 5xx
      res.statusCode >= 400 ? '\x1b[33m' :  // yellow — 4xx
      res.statusCode >= 200 ? '\x1b[32m' :  // green  — 2xx
      '\x1b[0m';                             // reset

    console.log(
      `${statusColor}[${res.statusCode}]\x1b[0m` +
      ` ${req.method.padEnd(7)} ${req.originalUrl.padEnd(25)} — ${duration}ms`
    );
  });

  next();
};

module.exports = logger;
