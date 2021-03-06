const ordersModel = require("../models/orders.model");
const userModel = require("../models/user.model");
const successHandler = require("../helpers/successHandler");
const errorHandler = require("../helpers/errorHandler");

class Order {
  /////---------------------user control --------------------//////////
  static placeOrder = async (req, res) => {
    try {
      const order = await ordersModel.create({
        ...req.body,
        userId: req.user._id,
      });
      successHandler(order, res, "order placed successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };

  static editOrder = async (req, res) => {
    try {
      let order = await ordersModel.findByIdAndUpdate(req.params.orderId, {
        $set: req.body,
      });
      successHandler(order, res, "order edited successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };
  static singleOrder = async (req, res) => {
    try {
      let order = await ordersModel.findById(req.params.orderId);
      if (!order) throw new Error("order not found");
      successHandler(order, res, "order fetched successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };

  static showAllOrders = async (req, res) => {
    try {
      let allOrders = await ordersModel.find({ user: req.user._id });
      if (allOrders.length == 0) throw new Error("user have no orders");
      successHandler(allOrders, res, "orders fetched successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };
  static changeOrderStatus = async (req, res) => {
    try {
      let order = await ordersModel.findByIdAndUpdate(req.params.orderId, {
        status: req.body.status,
      });
      if (!order) throw new Error("no order to delete");
      await req.user.save();
      successHandler(order, res, "order deleted successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };

  /////---------------------admin control --------------------//////////
  //show all orders
  static allOrdersAdmin = async (req, res) => {
    try {
      let allOrders = await ordersModel
        .find()
        .populate("userId")
        .populate("productId");
      if (allOrders.length == 0) throw new Error("no orders");
      successHandler(allOrders, res, "orders fetched successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };
  //delete orders for specific user
  static delOrdersAdmin = async (req, res) => {
    try {
      // let user = await userModel.findById(req.params.userId)
      // user.orders = []
      // await user.save()
      await ordersModel.deleteMany({ userId: req.params.userId });
      successHandler(null, res, "orders deleted successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };
  //delete single order for specific user
  static delSingleOrderAdmin = async (req, res) => {
    try {
      await ordersModel.findByIdAndDelete(req.params.orderId);
      successHandler(null, res, "orders deleted successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };
}

module.exports = Order;
