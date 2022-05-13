const { model, Schema } = require("mongoose");
const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);
cartSchema.methods.toJSON = function () {
  const cart = this.toObject();
  const { __v, ...others } = cart;
  return others;
};

const Cart = model("Cart", cartSchema);

module.exports = Cart;
