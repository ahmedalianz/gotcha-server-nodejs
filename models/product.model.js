const { Schema, model } = require("mongoose");
const reviewSchema = new Schema(
  {
    message: String,
    rate: Number,
    date: Date,
    productId: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const categorySchema = new Schema(
  {
    name: String,
    subCategories: [
      {
        name: String,
      },
    ],
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    shortName: {
      type: String,
      trim: true,
      maxlength: 35,
      required: true,
    },
    brand: String,
    longName: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    specifications: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sizes: [
      {
        type: String,
      },
    ],
    colors: [
      {
        type: String,
      },
    ],
    categories: [
      {
        type: String,
      },
    ],
    keywords: [
      {
        type: String,
      },
    ],
    reviewsRatings: [
      {
        type: Number,
      },
    ],
    mainImage: {
      type: String,
      trim: true,
      default: "uploads/product.png",
    },
    images: [
      {
        type: String,
        trim: true,
        default: "uploads/product.png",
      },
    ],
    inventoryQuantity: {
      type: Number,
      required: true,
    },
    discount: {
      percentage: {
        type: Number,
        min: 0,
      },
      active: Boolean,
    },
    bestSeller: Boolean,
    kidsSizes: Boolean,
  },
  { timestamps: true }
);

productSchema.methods.toJSON = function () {
  const product = this.toObject();
  const { __v, ...others } = product;
  return others;
};
reviewSchema.methods.toJSON = function () {
  const review = this.toObject();
  const { __v, ...others } = review;
  return others;
};
categorySchema.methods.toJSON = function () {
  const category = this.toObject();
  const { __v, ...others } = category;
  return others;
};
const Review = model("Review", reviewSchema);
const Product = model("Product", productSchema);
const Category = model("Category", categorySchema);

module.exports = { Product, Review, Category };
