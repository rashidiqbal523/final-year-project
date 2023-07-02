const Post = require("../models/post");
exports.homepage = async (req, res) => {
  
      let perPage = 10;
      let page = req.query.page || 1;
  
      try {
        const attractions = await Post.aggregate([
        {
            $match: {
              type: "attraction"
            }
        }, 
        { $sort: { createdAt: -1 } } ])
          .skip(perPage * page - perPage)
          .limit(perPage)
          .exec(); 
        const count = await Post.count();
  
        res.render('attractions', {
          attractions,
          current: page,
          locals: {
            title: "Travel Gateway -- Attractions"
          },
          pages: Math.ceil(count / perPage),
        });
  
      } catch (error) {
        console.log(error);
      }
  
}

exports.attraction = async (req, res) => {
  
    let perPage = 10;
    let page = req.query.page || 1;

    try {
      const attraction =await Post.findOne({ _id: req.params.id })
      if(!attraction) {
        req.flash("error", "Attraction Not Found")
        res.redirect("/")
      }
      res.render('view_attraction', {
        attraction,
        locals: {
          title: "Travel Gateway -- Attractions"
        },
      });

    } catch (error) {
      req.flash("error", "Attraction Not Found")
        res.redirect("/")
    }

}