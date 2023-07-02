const multer = require('multer');
const nodemailer = require('nodemailer');


module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be logged in');
    res.redirect('/login');
  } else {
    next();
  }
}
module.exports.isNotLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    // req.session.returnTo = req.originalUrl;
    res.redirect('/');
  } else {
    next();
  }
}

module.exports.isAdmin = async (req, res, next) => {
  if (req.user.role != "admin") {
    req.flash('error', 'You do not have permission to access Admin Pages');
    return res.redirect(`/`);
  }
  next();
}
module.exports.isNotAdmin = async (req, res, next) => {
  if (req.user.role == "admin") {
    req.flash('error', 'You do not have permission to User Pages');
    return res.redirect(`/`);
  }
  next();
}

module.exports.isUser = async (req, res, next) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  if (req.user.role != "user") {
    req.flash('error', 'You do not have permission!');
    return res.redirect(`/`);
  }
  next();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // Specify the destination folder for uploaded pictures
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the filename to be unique
  }
});
module.exports.upload = multer({ storage: storage });


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "",
        pass: ""
    }
});
 module.exports.sendEmail = async (to, subject, html) => {
  try {

      const mailOptions = {
          from: "",
          to,
          subject,
          html
      };

      await transporter.sendMail(mailOptions);
      return {
          success: true
      }
  } catch (e) {
      return {
          success: false,
          error: e.message
      }
  }
};