const errorHandler = (err, req, res, next) => {
  console.log(err);
  
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }

  

  return res.status(500).json({
    success: false,
    message: "Internal Server Error. Please try again later.",
  });
};

// 404 Handler - Middleware for undefined routes
const notFoundHandler = (req, res, next) => {
  const error = {
    message: "Route not found",
    statusCode: 404,
  };
  next(error); 
};

module.exports = { errorHandler, notFoundHandler };
