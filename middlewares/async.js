//nothing out of the box
//it shortens the need of writing tryCatch in each controller function
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;