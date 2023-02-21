const axios = require("axios");

class UserController {
    constructor() { }


    async home(req, res) {
        try {

            let pageData = {
                title: "Homepage",
                pageName: "home",
                isUserLogIn: false,
                status: '',
                message: '',
                allProducts: '',
            }
            if (req.cookies.isUserLogIn) {
                pageData.isUserLogIn = req.cookies.isUserLogIn
            };
            if (req.session.status && req.session.message) {
                pageData.status = req.session.status ;
                pageData.message= req.session.message;
                delete req.session.status ,req.session.message; 
            }
            let allProducts = await axios.get("http://localhost:3003/api/v1/product")
            console.log(" &&& allProducts &&&", allProducts.data);
            pageData.allProducts = allProducts.data;
            res.render("user/template", pageData)
        } catch (error) {

        }

    };

    register(req, res) {
        let pageData = {
            title: "register",
            pageName: "register",
            status: "",
            message: "",
            isUserLogIn: false,

        }
        if (req.cookies.isUserLogIn) {
            pageData.isUserLogIn = req.cookies.isUserLogIn
        };
        if (req.session.status && req.session.message) {
            pageData.status = req.session.status;
            pageData.message = req.session.message;
            delete req.session.status, req.session.message
        }
        res.render("user/template", pageData)
    };

    login(req, res) {
        let pageData = {
            title: "login",
            pageName: "login",
            status: "",
            message: "",
            isUserLogIn: false,
        }
        if (req.cookies.isUserLogIn) {
            pageData.isUserLogIn = req.cookies.isUserLogIn
        };
        if (req.session.status && req.session.message) {
            pageData.status = req.session.status;
            pageData.message = req.session.message;
            delete req.session.status, req.session.message
        }
        res.render("user/template", pageData)
    };

    async myOrder(req, res) {
        try {
            let pageData = {
                title: "My Orders",
                pageName: "my-order",
                status: "",
                message: "",
                isUserLogIn: false,
            }
            if (req.cookies.isUserLogIn) {
                pageData.isUserLogIn = req.cookies.isUserLogIn
            };
            if (req.session.status && req.session.message) {
                pageData.status = req.session.status;
                pageData.message = req.session.message;
                delete req.session.status, req.session.message
            }
            let userIdToken = `Bearer ${req.cookies.isUserLogIn}`
            let myOrders = await axios.get('http://127.0.0.1:3003/api/v1/orders/myorder', {
                headers: {
                    Authorization: userIdToken
                }
            })
            console.log('myOrders', myOrders);
            pageData.order = myOrders.data;
            res.render("user/template", pageData);
        } catch (error) {
            if (error.response && error.response.status) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect("/")
            }
            console.log("controller order page error :::", error);
        }
    };

    async orderItemDetails(req, res) {
        try {
            console.log('req.query', req.query);
            let orderItems = await axios.get(`http://localhost:3003/api/v1/orders/order-items/${req.query.orderId}`)
            console.log('orderItems', orderItems);
            res.json(
                orderItems.data
            )
        } catch (error) {
            if (error.response && error.response.status) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                console.log('error', error);
            }
        }
    }

    async profile(req, res) {
        try {

            let pageData = {
                title: "profile",
                pageName: "profile",
                isUserLogIn: false,
                singleUser: "",
                status: '',
                message: '',
            }
            if (req.cookies.isUserLogIn) {
                pageData.isUserLogIn = req.cookies.isUserLogIn
            };
            if (req.session.status && req.session.message) {
                pageData.status = req.session.status;
                pageData.message = req.session.message;
                delete req.session.status, req.session.message
            };
            let userIdToken = `Bearer ${req.cookies.isUserLogIn}`
            let result = await axios.get(`http://localhost:3003/api/v1/user`, {
                headers: {
                    Authorization: userIdToken
                }
            });
            pageData.singleUser = result.data[0]
            res.render("user/template", pageData)
        } catch (error) {
            if (error.response && error.response.status) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect("/profile")
            }
            console.log("controller updatePassword page error :::", error);
        }
    };

    //  async profile(req, res){
    //     let pageData = {
    //         title: "profile",
    //         pageName: "profile",
    //         isUserLogIn: false,
    //         singleUser: "",
    //         status:'',
    //         message:'',
    //     }
    //     if (req.cookies.isUserLogIn) {
    //         pageData.isUserLogIn = req.cookies.isUserLogIn
    //     };
    //     if (req.session.status && req.session.message) {
    //         pageData.status = req.session.status;
    //         pageData.message = req.session.message;
    //         delete req.session.status, req.session.message
    //     };
    //      let userIdToken = req.cookies.isUserLogIn
    //      console.log("userId", userId);
    //      let result = await axios.get(`http://localhost:3003/api/v1/user/getUserById/${userId}`)
    //      console.log("result", result);
    //      pageData.singleUser = result.data[0]
    //     res.render("user/template", pageData)
    // };

    async updateProfile(req, res) {
        try {
            console.log("req.body", req.body);
            let formData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                gender: req.body.gender,
                state: req.body.state,
                city: req.body.city,
                dob: req.body.dob,
                pincode: req.body.pincode,
                userId: req.body.userId,
            }
            let result = await axios.put("http://localhost:3003/api/v1/user", formData);
            console.log("result", result);
            req.session.status = "SUCCESS";
            req.session.message = result.data.message;
            res.redirect("/profile");
        } catch (error) {
            if (error.response && error.response.status) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect("/profile")
            }
            console.log("controller registretion page error :::", error);
        }
    }
    async updatePassword(req, res) {
        try {
            console.log("req.body", req.body);
            let formData = {
                currentPassword: req.body.currentPassword,
                newPassword: req.body.newPassword,
                confirmNewPassword: req.body.confirmNewPassword,
            }
            let token = `Bearer ${req.cookies.isUserLogIn}`
            let result = await axios.put("http://localhost:3003/api/v1/user/updatePassword", formData, {
                headers: {
                    Authorization: token
                }
            });
            console.log(" /n/n//n  &&& result  &&&", result);
            res.redirect("/profile");
        } catch (error) {
            if (error.response && error.response.status) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                console.log("controller updatePassword page error :::", error.response.data);
                res.redirect("/profile")
            }
        }
    }

    addToCart(req, res) {
        console.log('req.body', req.body);
        let items = [];
        if (req.cookies.cartItems) {
            items = req.cookies.cartItems;
        }
        items.push(req.body.productId);
        items = [...new Set(items)]
        res.cookie("cartItems", items);
        console.log('req.cookies', req.cookies)
        res.json(true);
    }

    removeCartItem(req, res) {
        console.log('req.params.productId', req.params.productId);
        let cartItems = req.cookies.cartItems;
        res.clearCookie('cartItems')
        console.log('cartItems', cartItems)
        let index = cartItems.indexOf(req.params.productId);
        let removeItem = cartItems.splice(index, 1);
        if (cartItems.length < 1) {
            res.redirect('/cart');
        }
        console.log('cartItems', cartItems);
        res.cookie('cartItems', cartItems)
        res.redirect('/cart');

    }

    async cart(req, res) {
        try {
            let pageData = {
                title: "cart",
                pageName: "cart",
                isUserLogIn: false,
                cartItems: '',
            }
            if (req.cookies.isUserLogIn) {
                pageData.isUserLogIn = req.cookies.isUserLogIn
            };
            let productIds = req.cookies.cartItems
            if (req.cookies.cartItems) {
                // console.log('productId',productIds)
                let cartItems = await axios.post('http://localhost:3003/api/v1/product/cartItems', { productIds });
                // console.log('cartItems',cartItems)
                pageData.cartItems = cartItems.data;
            }
            res.render("user/template", pageData);

        } catch (error) {
            if (error.response && error.response.status) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect("/home")
            }
            console.log("controller cart page error :::", error);
        }
    };

    proceedToCheckOut(req, res) {
        console.log('req.body', req.body);
        let orderItems = {
            quantity: req.body.quantity,
            productIds: req.body.productIds
        };
        res.cookie('orderItems', orderItems);
        res.redirect('/checkout');
    }

    async checkout(req, res) {
        let pageData = {
            title: "proceedToCheckOut",
            pageName: "proceedToCheckOut",
            isUserLogIn: false,
            quantity: '',
            products: '',
        }
        if (req.cookies.isUserLogIn) {
            pageData.isUserLogIn = req.cookies.isUserLogIn
        };
        let orderItems = req.cookies.orderItems;
        console.log('orderItem', orderItems)
        let quantity = orderItems.quantity;
        let productIds = orderItems.productIds;
        pageData.quantity = quantity;
        if (req.cookies.orderItems) {
            let products = await axios.post('http://localhost:3003/api/v1/product/cartItems', { productIds });
            console.log(' && products &&', products.data);
            pageData.products = products.data;
        }
        res.render("user/template", pageData)
    };

    async placeOrder(req, res) {
        try {
            console.log('req.body', req.body);
            let data = req.body
            let userIdToken = `Bearer ${req.cookies.isUserLogIn}`
            let result = await axios.post(`http://localhost:3003/api/v1/orders`, data, {
                headers: {
                    Authorization: userIdToken
                }
            });
            console.log('result', result);
            req.session.status = "order placed";
            req.session.message = 'your order have been placed';
            res.clearCookie('cartItems');
            res.clearCookie('orderItems')
            res.redirect('/')
        } catch (error) {
            if (error.response && error.response.status == 401) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect("/")
            }
            console.log("controller cart page error :::", error);
        }
    };

    async registretion(req, res) {
        try {
            console.log("req.body", req.body);
            let formData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                gender: req.body.gender,
                state: req.body.state,
                city: req.body.city,
                dob: req.body.dob,
                pincode: req.body.pincode,
                email: req.body.email,
                password: req.body.password,
            }
            let result = await axios.post("http://localhost:3003/api/v1/user/", formData);
            console.log("result", result);
            res.redirect("/login");
            return false;
        } catch (error) {
            if (error.response && error.response.status) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect("/register")
            }
            console.log("controller registretion page error :::", error);
        }
    };

    async loginUser(req, res) {
        try {
            console.log("req.body", req.body);
            let formData = {
                username: req.body.email,
                password: req.body.password,
            }
            let result = await axios.post("http://localhost:3003/api/v1/user/login", formData);
            console.log("result", result);
            res.cookie("isUserLogIn", result.data.token)
            console.log("result.data.data", result.data.token);
            res.redirect("/");
            return false;
        } catch (error) {
            if (error.response && error.response.status) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect("/login")
            }
            console.log("controller registretion page error :::", error);
        }
    };

    logout(req, res) {
        res.clearCookie("isUserLogIn");
        res.redirect("/login")
    }
};
module.exports = new UserController();