const cartModel = require("../models/cart.model");
const errorHandler = require("../helpers/errorHandler");
const successHandler = require("../helpers/successHandler");
class Cart {
  // --------------user control for his cart--------------------
  static addCartItem = async (req, res) => {
    try {
      let itemalreadyInCart = await cartModel.findOne({
        product: req.params.productId,
        user: req.user._id,
      });
      if (itemalreadyInCart) {
        await cartModel.findOneAndUpdate(
          {
            product: req.params.productId,
            user: req.user._id,
          },
          { $set: req.body }
        );
        successHandler(null, res, "product added to cart successfully");
      } else {
        const cartItem = await cartModel.create({
          ...req.body,
          user: req.user._id,
          product: req.params.productId,
        });
        successHandler(cartItem, res, "product added to cart successfully");
      }
    } catch (e) {
      errorHandler(e, res);
    }
  };
  static removeCartItem = async (req, res) => {
    try {
      await cartModel.deleteOne({
        _id: req.params.cartItemId,
        user: req.user._id,
      });
      successHandler(null, res, "product removed to cart successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };
  static myCart = async (req, res) => {
    try {
      const myCart = await cartModel
        .find({ user: req.user._id })
        .populate("product")
        .populate("user");
      successHandler(myCart, res, "cart shown successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };
  static editCart = async (req, res) => {
    try {
      let cartItem = await cartModel.updateOne(
        { _id: req.params.cartItemId, user: req.user._id },
        { $set: req.body }
      );
      if (!cartItem) throw new Error("not found");
      successHandler(
        cartItem,
        res,
        "product amount updated in cart successfully"
      );
    } catch (e) {
      errorHandler(e, res);
    }
  };
  static clearCart = async (req, res) => {
    try {
      await cartModel.deleteMany({ userId: req.user._id });
      successHandler(null, res, "cart cleared successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };
}
module.exports = Cart;
