const asyncHandler = require("../middlewares/async");
const axios = require("axios");
const URL = "https://api.ecommerce.com/products";

//this function calls the url endpoint
const fetchProducts = async (minP, maxP, finalProducts) => {
  try {
    const { data } = await axios.get(
      `${URL}?minPrice=${minP}&maxPrice=${maxP}`
    );
    //just handeling an edge case if minPrice gets bigger than maxPrice
    if (minP > maxP) {
      return;
    }
    //if total == data ...then in this price range (minP - maxP)
    //that means we've got all the products, so include push it in the finalProducts
    if (data.total === data.count) {
      finalProducts.push(...data.products);
    } else {
      //otherwise calculate the middle of the price range, and call the function again, with mid value
      //Basically, tried to implement a binary search esque algo
      //each time we don't find the required result (total===count) we call for half or the range
      let midP = (minP + maxP) / 2;
      fetchProducts(minP, midP, finalProducts);
      fetchProducts(midP + 1, maxP, finalProducts);
    }
  } catch (error) {
    return new Error(`Error at price range ${minP} - ${maxP}`);
  }
};

//  @desc       create single user
//  @route      GET /api/products
//  @access     Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  //this will be the final product list
  const products = [];
  //called a function with the given price range
  await fetchProducts(0, 100000, products);

  res.status(200).json({
    success: true,
    data: products,
  });
});
