
// Error Handler
export const errorHandler = async (error, req, res, next) => {
    const statusCode = error.status || 500;
    res.status(statusCode);
    res.json({
        error: {
        status: statusCode,
        error: error.message
      }
    });
};
