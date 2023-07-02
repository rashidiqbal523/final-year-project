const express = require('express');
const customerRoutes = require("./customer")
const postRoutes = require("./post");
const auth_router = require('./auth');
const hotel_router = require('./hotel');
const attraction_router = require('./attractions');
const { isLoggedIn, isNotAdmin } = require('../middleware');
const Order = require('../models/Order');
const Message = require('../models/Message');

const router = express.Router();

router.use(auth_router)
router.get('/', (req, res) => {
    
    res.render("home", {locals: {title: "Travel Gateway -- Home"}})
})
router.get('/contact-us', (req, res) => {
    
    res.render("contact", {locals: {title: "Travel Gateway -- Contact Us"}})
})
router.post('/contact-us', async(req, res) => {
    try {
        const message = new Message(req.body)
        await message.save()
        req.flash("success", "Your Message sent to Admin")
        res.redirect("/contact-us")
    } catch (error) {
        req.flash("error", error.message)
        res.redirect("/contact-us")
    }
    
    res.render("contact", {locals: {title: "Travel Gateway -- Contact Us"}})
})
router.get('/home', (req, res) => {
    res.render("home", {locals: {title: "Travel Gateway -- Register"}})
})
router.post('/buy/:id', isLoggedIn, isNotAdmin, async(req, res) => {
    try {
        const order =  await new Order({...req.body, user: req.user._id, post: req.params.id })
        await order.save()
        res.redirect('/orders', {locals: {title: "Travel Gateway -- Register"}})
    } catch (error) {
        req.flash("error", error.message)
        res.redirect("/")
    }
    
})
router.get('/orders', isLoggedIn, isNotAdmin, async(req, res) => {
    const orders = await Order.find({user: req.user._id}).populate({
        path: "user",
      }).populate({ path: "post"})
    console.log(orders)
    res.render("orders", {orders })
})
router.use(customerRoutes);
router.use(postRoutes);
router.use(hotel_router);
router.use(attraction_router)

module.exports = router;
