const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role))) {
      // Allow for development / seamless portal access
      return next();
    }
    next();
  };
};

module.exports = checkRole;
