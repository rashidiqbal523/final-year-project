const User = require("./server/models/User");
const Post = require("./server/models/post");

module.exports.saveDummyData = async() => {
    await createAdmin()
    await createUser()
    await createAttraction()
    await createHotel()
}

async function createAdmin() {
    const admins = await User.find({ role: "admin" });
    if (!admins || !admins.length) {
      const user = new User({
        name: "Admin",
        phone: "03000000000",
        username: "admin@example.com",
        role: "admin",
      });
      const password = "admin";
      const newUser = await User.register(user, password);
      console.log("Successfully created new Admin");
    }
  }
  async function createUser() {
    const users = await User.find({ role: "user" });
    if (!users || !users.length) {
      const user = new User({
        name: "user",
        phone: "03000000000",
        username: "user@example.com",
        role: "user",
      });
      const password = "admin";
      const newUser = await User.register(user, password);
      console.log("Successfully created new User");
    }
  }


  async function createHotel() {
    const posts = await Post.find({ type: "hotel" });
    if (!posts || !posts.length) {
      const post = new Post({
        Title: "5 Star Hotel",
        details: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
        type: "hotel",
        image: "/public/uploads/hero_4.jpg",
        price: 20,
        menu: [{
            Title: "Murgh Tikka Masala",
            details: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
            price: 18
        },
        {
            Title: "French Toast Combo",
            details: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
            price: 10
        }],
      });
      await post.save()
      console.log("Successfully created new Hotel");
    }
  }
  async function createAttraction() {
    const posts = await Post.find({ type: "attraction" });
    if (!posts || !posts.length) {
      const post = new Post({
        Title: "K2",
        details: "K2, at 8,611 metres (28,251 ft) above sea level, is the second-highest mountain on Earth, after Mount Everest (at 8,849 metres (29,032 ft)).",
        type: "attraction",
        image: "/public/uploads/k2.jpg",
        price: 20,
      });
      await post.save()
      console.log("Successfully created new Attraction");
    }
  }