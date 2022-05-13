const router = require("express").Router();
const orderController = require("../controller/orders.controller");
const auth = require("../middleware/auth");

//----------------user options to control his order ----------------
router.post("/placeOrder", auth("User"), orderController.placeOrder);
router.patch("/editOrder/:orderId", auth("User"), orderController.editOrder);
router.patch(
  "/changeOrderStatus/:orderId",
  auth("User"),
  orderController.changeOrderStatus
);
router.get("/myOrders", auth("User"), orderController.showAllOrders);
router.get("/singleOrder/:orderId", auth("User"), orderController.singleOrder);

//----------------admin options to control orders ----------------
router.get("/allOrdersAdmin", auth("Admin"), orderController.allOrdersAdmin);
router.delete(
  "/delOrdersAdmin/:userId",
  auth("Admin"),
  orderController.delOrdersAdmin
);
router.delete(
  "/delSingleOrderAdmin/:orderId",
  auth("Admin"),
  orderController.delSingleOrderAdmin
);

module.exports = router;
