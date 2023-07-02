const Order = require("../models/Order");
const Post = require("../models/post");
const mongoose = require("mongoose");

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  const locals = {title: "Travel Gateway -- Posts"}

    let perPage = 10;
    let page = req.query.page || 1;

    try {
      const posts = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      const count = await Post.count();

      res.render('post', {
        locals,
        posts,
        current: page,
        pages: Math.ceil(count / perPage),
      });

    } catch (error) {
      console.log(error);
    }
}
// exports.homepage = async (req, res) => {
//     const messages = await req.consumeFlash('info');
//     const locals = {
//       title: 'NodeJs',
//       
//     }

//     try {
//       const customers = await Customer.find({}).limit(22);
//       res.render('index', { locals, messages, customers } );
//     } catch (error) {
//       console.log(error);
//     }
// }

/**
 * GET /
 * About
 */
exports.about = async (req, res) => {
  const locals = {
    title: 'Travel Gateway -- Posts',
    
  }

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const posts = await Post.aggregate([ 
      {
        $sort: {
          createdAt: -1
        }
      }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Post.count();

    res.render('/post', {
      locals,
      posts,
      current: page,
      pages: Math.ceil(count / perPage),
      // messages
    });

  } catch (error) {
    req.flash("error", error.message)
  }
}

exports.post = async (req, res) => {
  const locals = {
    title: 'Travel Gateway -- Posts',
    
  }

  try {
    res.render('post', locals );
  } catch (error) {
    console.log(error);
  }
}






/**
 * GET /
 * New Customer Form
 */
exports.addPost = async (req, res) => {
  const locals = {
    title: "Travel Gateway -- Posts",
    
  };

  res.render("post/add", locals);
};

/**
 * POST /
 * Create New Customer
 */
exports.postPost = async (req, res) => {

  try {
    const file = {
      // filename: req.file && req.file.filename ? req.file.filename : "",
      image: req.file && req.file.path ? req.file.path : "",
    }
    const newPost = new Post({
      Title:req.body.Title,
      details: req.body.details,
      type: req.body.type,
      price: req.body.price,
      ...file
      
    });
    await Post.create(newPost);
    await req.flash("info", "New post has been added.");

    res.redirect("/admin/posts");
  } catch (error) {
    console.log(error);
    await req.flash("error", error.message);

    res.redirect("/admin/posts");
  }
};
exports.addMenu = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    post.menu.push(req.body)
    await post.save()
    req.flash("success", "Updated Successfully")
    await res.redirect(`/admin/posts/view/${req.params.id}`);
  } catch(e) {
    console.log(e)
    req.flash("error", e.message)
    res.redirect(`/admin/posts`);
  }
}


/**
 * GET /
 * Customer Data 
*/
exports.view = async (req, res) => {

  try {
    const post = await Post.findOne({ _id: req.params.id })

    const locals = {
      title: "Travel Gateway -- Posts",
      
    };

    res.render('post/view', {
      locals,
      post
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
    const post = await Post.findOne({ _id: req.params.id })

    const locals = {
      title: "Travel Gateway -- Posts",
      
    };

    res.render('post/edit', {
      locals,
      post
    })

  } catch (error) {
    console.log(error);
  }

}




/**
 * GET /
 * Update Customer Data 
*/
exports.editPost = async (req, res) => {
  try {
    const file = {
      // filename: req.file && req.file.filename ? req.file.filename : "",
      image: req.file && req.file.path ? req.file.path : "",
    }
    let post = {
      Title:req.body.Title,
      details: req.body.details,
      updatedAt: Date.now(),
      price: req.body.type,

    }
    if(req.file) {
      post = {
        Title:req.body.Title,
        details: req.body.details,
        updatedAt: Date.now(),
      price: req.body.type,

        ...file
      }
    }
    await Post.findByIdAndUpdate(req.params.id, post);
    req.flash("success", "Updated Successfully")
    await res.redirect(`/admin/posts/edit/${req.params.id}`);
    
    console.log('redirected');
  } catch (e) {
    req.flash("error", e.message)
    
  }
}


/**
 * Delete /
 * Delete Customer Data 
*/
exports.deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    await Order.deleteMany({post: mongoose.Types.ObjectId(req.params.id)})
    req.flash("success", "Deleted Successfully")
    res.redirect("/admin/posts")
  } catch (e) {
    req.flash("error", e.message)
  }
}


/**
 * Get /
 * Search Customer Data 
*/
exports.searchPosts = async (req, res) => {

  const locals = {
    title: "Travel Gateway -- Posts",
    
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const posts = await Post.find({
      $or: [
        { Title: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        { details: { $regex: new RegExp(searchNoSpecialChar, "i") }},
      ]
    });

    res.render("postsearch", {
      posts,
      locals
    })
    
  } catch (error) {
    console.log(error);
  }

}