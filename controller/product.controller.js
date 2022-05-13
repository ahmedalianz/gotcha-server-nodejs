const {
  Product: productModel,
  Review: reviewModel,
  Category: categoryModel,
} = require("../models/product.model");
const successHandler = require("../helpers/successHandler");
const errorHandler = require("../helpers/errorHandler");
const fs = require("fs");
class Product {
  static addProduct = async (req, res) => {
    try {
      const product = await productModel.create(req.body);

      successHandler(product, res, "Product added successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static getProductsByPage = async (req, res) => {
    try {
      const allProducts = await productModel
        .find()
        .limit(12)
        .skip((req.params.page - 1) * 12);
      successHandler(allProducts, res, "all Products shown successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static getProductsByCategory = async (req, res) => {
    try {
      const allProducts = await productModel.find({
        categories: req.params.categoryName,
      });
      successHandler(allProducts, res, "all Products shown successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };

  static singleProduct = async (req, res) => {
    try {
      const product = await productModel.findOne({ _id: req.params.productId });
      if (!product) throw new Error("product not found");
      successHandler(product, res, "product shown successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static addReview = async (req, res) => {
    try {
      let review = await reviewModel.create(req.body);
      await productModel.findByIdAndUpdate(req.body.productId, {
        $push: { reviewsRatings: req.body.rate },
      });
      successHandler(review, res, "review added  successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static getReviews = async (req, res) => {
    try {
      const review = await reviewModel
        .find({ productId: req.params.productId })
        .populate("user");
      successHandler(review, res, "reviews shown successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static addCategory = async (req, res) => {
    try {
      let category = await categoryModel.create(req.body);

      successHandler(category, res, "category added  successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static editCategory = async (req, res) => {
    try {
      await categoryModel.findByIdAndUpdate(req.params.categoryId, {
        $set: req.body,
      });

      successHandler(null, res, "category deleted  successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static delCategory = async (req, res) => {
    try {
      await categoryModel.findByIdAndDelete(req.params.categoryId);
      successHandler(null, res, "category deleted  successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static getAllCategories = async (req, res) => {
    try {
      const review = await categoryModel.find();
      successHandler(review, res, "categories shown successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };

  static editProduct = async (req, res) => {
    try {
      let product = await productModel.findById(req.params.productId);
      const updatedImages = product.images.filter((image) => {
        return !req.body.deletedImages.includes(image);
      });
      product = req.body.product;
      product.images = updatedImages;
      await productModel.findByIdAndUpdate(req.params.productId, {
        $set: product,
      });
      req.body.deletedImages.length &&
        req.body.deletedImages.map((image) => {
          fs.unlinkSync(image, (err) => {
            if (err) throw err;
          });
        });
      if (!product) throw new Error("product not found");
      successHandler(product, res, " product is edited successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };

  static delProduct = async (req, res) => {
    try {
      let product = await productModel.findById(req.params.productId);
      await reviewModel.deleteMany({ productId: req.params.productId });
      if (!product) throw new Error("product not found");
      product.images.map((image) => {
        fs.unlinkSync(image, (err) => {
          if (err) throw err;
        });
      });

      await productModel.findByIdAndDelete(req.params.productId);
      successHandler(null, res, " product is deleted successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };

  static uploadImage = async (req, res) => {
    try {
      let productObject = await productModel.findById(req.params.productId);
      if (req.file) {
        await productModel.findByIdAndUpdate(req.params.productId, {
          $set: {
            mainImage: "uploads/" + req.user._id + "/" + req.file.filename,
          },
        });
      } else {
        await productModel.findByIdAndUpdate(req.params.productId, {
          $set: {
            mainImage: "uploads/" + "product.png",
          },
        });
        fs.unlinkSync(productObject.mainImage, (err) => {
          if (err) throw err;
        });
      }
      successHandler(null, res, "image uploaded successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };
  static uploadImages = async (req, res) => {
    try {
      if (req.files) {
        let images = req.files.map((file) => {
          return "uploads/" + req.user._id + "/" + file.filename;
        });
        await productModel.findByIdAndUpdate(req.params.productId, {
          $push: {
            images: images,
          },
        });
        successHandler(null, res, "images uploaded successfully");
      }
    } catch (e) {
      errorHandler(e, res);
    }
  };
}

module.exports = Product;
