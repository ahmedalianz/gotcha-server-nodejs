const productController = require("../controller/product.controller");
const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/fileUpload");

//----------------public crud operations of product -----
router.get("/getProductsByPage/:page", productController.getProductsByPage);
router.get(
  "/getProductsByCategory/:categoryName",
  productController.getProductsByCategory
);
router.get("/singleProduct/:productId", productController.singleProduct);

//----------------crud operations of product controlled by admin-----
router.post("/addProduct/", auth("Admin"), productController.addProduct);
router.patch(
  "/editProduct/:productId",
  auth("Admin"),
  productController.editProduct
);
router.patch(
  "/uploadImage/:productId",
  [auth("Admin"), upload.single("img")],
  productController.uploadImage
);
router.patch(
  "/uploadImages/:productId",
  [auth("Admin"), upload.array("images")],
  productController.uploadImages
);

router.delete(
  "/delProduct/:productId",
  auth("Admin"),
  productController.delProduct
);

//----------------reviews-----
router.post("/addReview", auth("User"), productController.addReview);
router.get("/getReviews/:productId", productController.getReviews);
//----------------categories-----
router.post("/addCategory", auth("Admin"), productController.addCategory);
router.patch(
  "/editCategory/:categoryId",
  auth("Admin"),
  productController.editCategory
);
router.delete(
  "/delCategory/:categoryId",
  auth("Admin"),
  productController.delCategory
);
router.get("/getAllCategories", productController.getAllCategories);

module.exports = router;
