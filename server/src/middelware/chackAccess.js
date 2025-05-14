const checkAccess = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res
          .status(403)
          .json({ message: "Access denied. please login first." });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }

      next(); 
    } catch (error) {
        next(error)
    }
}}
module.exports = checkAccess;
