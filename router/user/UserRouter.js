const express = require("express");
const userController = require("../../controller/user/UserController");
const app = express();

app.get("/", userController.home);

app.get("/register", userController.register);

app.get("/login", userController.login);

app.get("/profile", userController.profile);

app.post("/update-profile", userController.updateProfile);

app.post("/update-password", userController.updatePassword);

app.post("/add-to-cart", userController.addToCart);

app.get("/cart", userController.cart);

app.get("/remove-item/:productId", userController.removeCartItem);

app.post("/proceed-to-checkout", userController.proceedToCheckOut);

app.get("/checkout", userController.checkout);

app.post("/place-order", userController.placeOrder);

app.get('/my-order',userController.myOrder);

app.get('/order-items',userController.orderItemDetails)

app.post("/registretion", userController.registretion);

app.post("/loginUser", userController.loginUser);

app.get("/logout", userController.logout);

module.exports = app;