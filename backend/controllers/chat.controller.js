const openai = require('../config/openai');
const Product = require('../models/product.model');
const Basket = require('../models/basket.model');

/**
 * Extract ingredient names from a meal description using OpenAI
 * @param {string} message - The meal description provided by the user
 * @returns {Promise<Array<string>>} - Array of extracted ingredient names
 */

const extractIngredients = async (message) => {
  const openaiPrompt = `
You are an assistant that extracts ingredient names from meal descriptions.

Example:
Input: "I want to make Scrambled Eggs"
Output: ["Eggs", "Butter", "Salt"]

Input: "I want to make Pasta with Tomato Sauce"
Output: ["Pasta", "Tomato Sauce", "Garlic"]

Now extract ingredients from:
"${message}"

Return the result as a JSON array of ingredient names.
`;
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: openaiPrompt,
      },
    ],
  });

  const ingredients = JSON.parse(response.choices[0].message.content);
  return ingredients; // e.g., ["pasta", "tomato sauce"]
};


/**
 * Find matching products in the database for a list of ingredient names
 * @param {Array<string>} ingredientNames - List of ingredient names to search for
 * @returns {Promise<Array<Object>>} - Array of matched product documents
 */

const findProducts = async (ingredientNames) => {
  const matchedProducts = [];

  for (const ingredient of ingredientNames) {
    const regex = new RegExp(ingredient, 'i');

    const bestMatch = await Product.findOne({
      name: { $regex: regex },
      is_deleted: false,
    }).sort({ price: 1 }); // or add another sort criteria

    if (bestMatch) {
      matchedProducts.push(bestMatch);
    }
  }

  return matchedProducts;
};


/**
 * Add a list of products to a user's basket (create basket if it doesn't exist)
 * @param {string|ObjectId} userId - The user's ID
 * @param {Array<Object>} productList - List of product documents to add
 * @returns {Promise<void>}
 */

const addToBasket = async (userId, productList) => {
  const basket = await Basket.findOne({ customerId: userId });

  if (basket) {
    // Merge existing with new3
    productList.forEach(product => {
      const index = basket.products.findIndex(p => p.productId.equals(product._id));
      if (index > -1) {
        basket.products[index].quantity += 1;
      } else {
        basket.products.push({ productId: product._id, quantity: 1 });
      }
    });
    await basket.save();
  } else {
    await Basket.create({
      customerId: userId,
      products: productList.map(p => ({ productId: p._id, quantity: 1 }))
    });
  }
};



module.exports = {
  extractIngredients,
  findProducts,
  addToBasket
};