const validateProductBody = (req, res, next) => {
  const { name, description, price, organizerId ,catagory,inStock } =
    req.body;

  // Validate `name`
  if (
    !name ||
    typeof name !== "string" ||
    name.trim().length < 3 ||
    name.trim().length > 100
  ) {
    return res.status(400).json({
      error:
        "Invalid 'name'. It must be a string between 3 and 100 characters.",
    });
  }

  // Validate `description`
  if (
    !description ||
    typeof description !== "string" ||
    description.length > 2000
  ) {
    return res.status(400).json({
      error:
        "Invalid 'description'. It must be a string not exceeding 2000 characters.",
    });
  }

  // // Validate `startDate`
  // const start = new Date(startDate);
  // if (!startDate || isNaN(start) || start < Date.now()) {
  //   return res.status(400).json({
  //     error: "Invalid 'startDate'. It must be a valid date in the future.",
  //   });
  // }

  // Validate `endDate`
  // const end = new Date(endDate);
  // if (!endDate || isNaN(end) || end <= start) {
  //   return res.status(400).json({
  //     error: "Invalid 'endDate'. It must be a valid date after 'startDate'.",
  //   });
  // }

  // Validate `price`
  if (price === undefined || typeof price !== "number" || price < 0) {
    return res.status(400).json({
      error: "Invalid 'price'. It must be a number greater than or equal to 0.",
    });
  }

  // Validate `slotsAvailable`
  // if (
  //   slotsAvailable === undefined ||
  //   typeof slotsAvailable !== "number" ||
  //   slotsAvailable < 0
  // ) {
  //   return res.status(400).json({
  //     error:
  //       "Invalid 'slotsAvailable'. It must be a number greater than or equal to 0.",
  //   });
  // }

  // If all validations pass
  next();
};

module.exports = validateProductBody;
