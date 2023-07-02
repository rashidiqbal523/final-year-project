const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

const postController = require('../controllers/postController');
const { isLoggedIn, isAdmin } = require('../middleware');
const Order = require('../models/Order');
const Message = require('../models/Message');
/**
 *  Customer Routes 
*/
router.get('/admin',isLoggedIn, isAdmin, customerController.homepage);
router.get('/admin/about', isLoggedIn,isAdmin, customerController.about);
router.get('/admin/add', isLoggedIn, isAdmin, customerController.addCustomer);
router.post('/admin/add', isLoggedIn, isAdmin, customerController.postCustomer);
router.get('/admin/view/:id', isLoggedIn, isAdmin, customerController.view);
router.get('/admin/edit/:id', isLoggedIn, isAdmin, customerController.edit);
router.put('/admin/edit/:id', isLoggedIn, isAdmin, customerController.editPost);
router.delete('/admin/edit/:id', isLoggedIn, isAdmin, customerController.deleteCustomer);
router.get('/admin/post', isLoggedIn, isAdmin, customerController.post);

router.post('/search',function(req,res){ customerController.searchCustomers});


// router.get('/', postController.homepage);
router.get('/about', postController.about);
router.get('/admin/orders', isLoggedIn, isAdmin,  async(req, res) => {
    const orders = await Order.find().populate({
        path: "user",
      }).populate({ path: "post"})
      res.render("admin_orders", {orders, locals: {title: "Travel Gateway -- Orders"}})
});
router.get('/admin/messages', isLoggedIn, isAdmin,  async(req, res) => {
  const messages = await Message.find()
    res.render("messages", {messages, locals: {title: "Travel Gateway -- Messages"}})
});


module.exports = router;