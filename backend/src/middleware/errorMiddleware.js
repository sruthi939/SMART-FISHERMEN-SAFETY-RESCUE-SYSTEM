module.exports = function errorMiddleware(err, req, res, next) {
  console.error('API Error:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
};
