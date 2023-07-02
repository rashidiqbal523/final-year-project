const User = require("../models/User")
const login = async (req, res) => {
    try {
        let error = null;
        const {
            username,
            password
        } = req.body;

        if (!username || !password) {
            error = "All the fields are required"
        }
        if (error) {
            req.flash("error", error)
            return res.redirect("/login")
        }

        req.flash("success", "Welcome back " + username + "!");
        const redirectUrl = req.session.returnTo || "/";
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/login")
    }
}

const register = async (req, res) => {
    try {
        let error = null;
        const {
            name,
            username,
            password,
            phone,
            re_password
        } = req.body;

        if (!name || !username || !password || !phone || !re_password) {
            error = "All the fields are required"
        }
        if (password != re_password) {
            error = "Password And Confirm Password not matched"
        }
        if (error) {
            req.flash('error', error)
            return res.redirect("/register")
        }

        const user = new User({
            name,
            username,
            phone,
            role: "user"
        });
        const signedupUser = await User.register(user, password);
        req.login(signedupUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Registered Successfully. Please Login");
            res.redirect("/login");
        });
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/register")
    }
}

module.exports = {
    login,
    register
}