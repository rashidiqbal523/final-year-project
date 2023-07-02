      
const menuBtn = document.querySelector(".menu-icon .fa-bars");
// const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".menu-icon .fa-close");
const items = document.querySelector(".nav-items");
const form = document.querySelector("form");
cancelBtn.classList.add("hide");

menuBtn.onclick = ()=>{
  items.classList.add("active");
  menuBtn.classList.add("hide");
  // searchBtn.classList.add("hide");
  cancelBtn.classList.remove("hide");
  cancelBtn.classList.add("show");

}
cancelBtn.onclick = ()=>{
  items.classList.remove("active");
  menuBtn.classList.remove("hide");
  cancelBtn.classList.remove("show");
  cancelBtn.classList.add("hide");
  form.classList.remove("active");
  cancelBtn.style.color = "#ff3d00";
}
// searchBtn.onclick = ()=>{
//   form.classList.add("active");
//   searchBtn.classList.add("hide");
//   cancelBtn.classList.add("show");
// }
