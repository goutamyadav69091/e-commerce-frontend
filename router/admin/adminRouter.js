const express = require("express");
const app = express();
const adminController = require("../../controller/admin/adminController");

app.get("/", adminController.homePage);

app.get("/adminAllUsers", adminController.adminAllUsers);

app.get("/all-category", adminController.allCategory);

app.post("/add-category", adminController.createCategory);

app.get("/get-single-category", adminController.getCatById);

app.post("/update-category", adminController.UpdateCategory);

app.get("/delete-category-by-admin/:catagoryId", adminController.deleteCategory);

app.post("/registretion-by-admin", adminController.registretionByAdmin);

app.post("/update-user", adminController.UpdateUserByAdmin);

app.get("/delete-user-by-admin/:userId", adminController.deleteUserByAdmin);


app.get("/admin-all-product", adminController.allProduct);

app.get("/delete-product-by-admin/:productId", adminController.deleteProduct);

app.post("/create-product", adminController.createProduct);

app.post("/update-product", adminController.updateProduct);

app.get("/admin-all-orders", adminController.allOrders);

app.post("/create-Order", adminController.createOrder);

app.post("/edit-Order", adminController.editOrder);

app.get("/delete-order/:orderId", adminController.deleteOrder);

module.exports = app;