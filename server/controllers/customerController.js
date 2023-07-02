const Customer = require("../models/Customer");
const mongoose = require("mongoose");
const User = require("../models/User");
const Order = require("../models/Order");

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {

  // const messages = await req.consumeFlash('info');
  const locals = {
    title: 'Travel Gateway -- Customers',
    
  }

  let perPage = 10;
  let page = req.query.page || 1;

  try {
    const customers = await User.aggregate([
      {
        $match: {
          role: "user"
        }
      }, 
      {
        $sort: {
          createdAt: -1
        }
      }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await User.count();

    res.render('index', {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      // messages
    });

  } catch (error) {
    req.flash("error", error.message)
  }
}


/**
 * GET /
 * About
 */
exports.about = async (req, res) => {
  const locals = {
    title: 'Travel Gateway -- About',
    
  }

  try {
    res.render('about', locals);
  } catch (error) {
    console.log(error);
  }
}
exports.post = async (req, res) => {
  const locals = {
    title: 'Travel Gateway -- Posts',
    
  }

  try {
    res.render('post', {locals});
  } catch (error) {
    console.log(error);
  }
}






/**
 * GET /
 * New Customer Form
 */
exports.addCustomer = async (req, res) => {
  const locals = {
    title: "Travel Gateway -- Add New Customer",
    
  };

  res.render("customer/add", locals);
};

/**
 * POST /
 * Create New Customer
 */
exports.postCustomer = async (req, res) => {
  try {
    let error = null;
    const {
      name,
      username,
      password,
      phone,
    } = req.body;

    if (!name || !username || !password || !phone) {
      error = "All the fields are required"
    }
    if (error) {
      req.flash('error', error)
      return res.redirect("/admin/add")
    }

    const user = new User({
      name,
      username,
      phone,
      role: "user"
    });
    const signedupUser = await User.register(user, password);
    req.flash("success", "Cutomer Added Successfully");
    res.redirect("/admin");
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/admin/add")
  }
};


/**
 * GET /
 * Customer Data 
 */
exports.view = async (req, res) => {

  try {
    const customer = await User.findOne({
      _id: req.params.id
    })

    const locals = {
      title: "View Customer Data",
      
    };

    res.render('customer/view', {
      locals,
      customer
    })

  } catch (error) {
    console.log(error);
  }

}



/**
 * GET /
 * Edit Customer Data 
 */
exports.edit = async (req, res) => {

  try {
    const customer = await User.findOne({
      _id: req.params.id
    })

    const locals = {
      title: "Edit Customer Data",
      
    };

    res.render('customer/edit', {
      locals,
      customer
    })

  } catch (error) {
    console.log(error);
  }

}



exports.editPost = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      username: req.body.username,
      phone: req.body.phone,
      password: req.body.password,
    });
    req.flash("success", "Updated Successfully")
    res.redirect(`/admin/edit/${req.params.id}`);
  } catch (error) {
    req.flash("error", e.message)
    res.redirect(`/admin/edit/${req.params.id}`)
  }
}


/**
 * Delete /
 * Delete Customer Data 
 */
exports.deleteCustomer = async (req, res) => {
  try {
    await User.deleteOne({
      _id: req.params.id
    });
    await Order.deleteMany({user: mongoose.Types.ObjectId(req.params.id)})
    req.flash("success", "user deleted successfully")
    res.redirect("/admin")
  } catch (error) {
    console.log(error);
    req.flash("error", error.message)
    res.redirect(`/admin/`)
  }
}


/**
 * Get /
 * Search Customer Data 
 */
exports.searchCustomers = async (req, res) => {

  const locals = {
    title: "Search Customer Data",
    
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [{
          firstName: {
            $regex: new RegExp(searchNoSpecialChar, "i")
          }
        },
        {
          lastName: {
            $regex: new RegExp(searchNoSpecialChar, "i")
          }
        },
      ]
    });

    res.render("search", {
      customers,
      locals
    })

  } catch (error) {
    console.log(error);
  }

}