const router = require("express").Router();
const userController = require("../controller/user.controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/fileUpload");

//-----------------register/login for users -----------
router.post("/register", userController.register);
router.post("/login", userController.login);

//-----------------register for admins -----------
//TODO:Create New Admins
router.post("/registerAdmin", userController.registerAdmin);

//----------------admin options to show single/all registerd users/delete them-----
router.get("/showUser/:id", auth("Admin"), userController.showUser);
router.delete("/deleteUser/:id", auth("Admin"), userController.delUser);
router.patch("/editUser/:id", auth("Admin"), userController.editUser);
router.get("/showAllUsers", auth("Admin"), userController.showAllUsers);
router.get("/showAllAdmins", auth("Admin"), userController.showAllAdmins);

//----------------admin options to show/edit/delete/logout(1/many devices) his account---------
router.patch("/editAdmin/:id", auth("Admin"), userController.editAdmin);
router.delete("/deleteAdmin/:id", auth("Admin"), userController.delAdmin);

//---------------common actions between user/admin--------
router.post("/logout", auth("Both"), userController.logout);
router.patch(
  "/changeImage",
  auth("Both"),
  upload.single("img"),
  userController.changeImage
);

//----------------user/admin options to contol his account---------
router.get("/showProfile", auth("Both"), userController.profileShow);
router.patch("/editProfile", auth("Both"), userController.profileEdit);
router.patch("/editPassword", auth("Both"), userController.passwordEdit);
router.delete("/deleteProfile", auth("Both"), userController.profileDelete);

module.exports = router;
