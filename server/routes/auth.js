const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const { isNotLoggedIn, sendEmail } = require('../middleware');
const { login, register } = require('../controllers/authController');
const auth_router = express.Router();
// const postController = require('../controllers/postController');

auth_router.get('/login', isNotLoggedIn, (req, res) => {

    res.render('auth/login', {locals: {title: "Travel Gateway -- Register"}})
})
auth_router.post('/login',isNotLoggedIn, passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}), login)
auth_router.get('/register',isNotLoggedIn, (req, res) => {
    res.render('auth/register', {layout: false, locals: {title: "Travel Gateway -- Register"}})
})
auth_router.post('/register', isNotLoggedIn, register)
auth_router.get('/logout',(req, res) => {
    req.logout();
    res.redirect("/login");
})
auth_router.get('/forgot',(req, res) => {
    res.render("forgot")
})
auth_router.post('/forgot', async(req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user) {
            req.flash("error", "This User not Exists")
            return res.redirect("/forgot")
        }
        const newPassword = Math.random().toString().substr(2, 6)
        await user.setPassword(newPassword)
        await user.save()
        const isSent = await sendEmail(user.username, "Forgot Password", "Your New Password is: " + newPassword)
        if(!isSent.success) {
            req.flash("error", isSent.error)
            res.redirect("/login")
        }
        req.flash("success", "Check your mail new password is sent")
        res.redirect("/login")
    } catch(e) {
        console.log(e)
        req.flash("error", e.message)
        res.redirect("/forgot")
    }
})






module.exports = auth_router;