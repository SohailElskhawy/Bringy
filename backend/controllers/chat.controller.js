const openai = require('../config/openai');
const Product = require('../models/product.model');
const Basket = require('../models/basket.model');
const extractIngredients = async (message) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: `Extract only the ingredient names from this sentence as a JavaScript array of strings: "${message}"`,
            },
        ],
    });

    const ingredients = JSON.parse(response.choices[0].message.content);
    return ingredients; // e.g., ["pasta", "tomato sauce"]
};


const findProducts = async (ingredientNames) => {
    const regexList = ingredientNames.map(name =>
        new RegExp(`\\b${name}\\b`, 'i') // word-boundary matching, case insensitive
    );

    const products = await Product.find({
        name: { $in: regexList },
        is_deleted: false
    });

    return products;
};




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