const Post = require("../models/post");
exports.homepage = async (req, res) => {
  
      let perPage = 10;
      let page = req.query.page || 1;
  
      try {
        const hotels = await Post.aggregate([
        {
            $match: {
              type: "hotel"
            }
        }, 
        { $sort: { createdAt: -1 } } ])
          .skip(perPage * page - perPage)
          .limit(perPage)
          .exec(); 
        const count = await Post.count();
  
        res.render('hotel', {
          locals: {title: "Travel Gateway -- Hotels"},
          hotels,
          current: page,
          pages: Math.ceil(count / perPage),
        });
  
      } catch (error) {
        console.log(error);
      }
  
}
exports.hotel = async (req, res) => {
  
    let perPage = 10;
    let page = req.query.page || 1;

    try {
      const hotel =await Post.findOne({ _id: req.params.id })
      if(!hotel) {
        req.flash("error", "Hotel Not Found")
        res.redirect("/")
      }
      res.render('view_hotel', {
        hotel,
        locals: {title: "Travel Gateway -- Hotels"},
      });

    } catch (error) {
      req.flash("error", "Hotel Not Found")
      res.redirect("/")

    }

}