const { model, Schema } = require("mongoose");
const orderSchema = new Schema(
  {
    userId: String,
    products: [
      {
        color: String,
        size: String,
        price: Number,
        quantity: Number,
        product: {
          _id: String,
          shortName: String,
          mainImage: String,
        },
      },
    ],
    price: Number,
    phone: String,
    shipping: {
      name: {
        type: String,
        required: true,
      },
      adress: {
        country: String,
        city: String,
      },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    date: Date,
    status: {
      type: String,
      default: "Ordered",
    },
  },
  { timestamps: true }
);
orderSchema.methods.toJSON = function () {
  const order = this.toObject();
  const { __v, ...others } = order;
  return others;
};

const Order = model("Order", orderSchema);

module.exports = Order;
