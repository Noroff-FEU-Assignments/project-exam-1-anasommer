const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");
const latestPostsContainer = document.querySelectorAll(".latest-container");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close menu when user clicks a link
navLink.forEach((link) => {
  return link.addEventListener("click", closeMenu);
});

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Make a call to API to get list of posts

async function getPosts() {
  const url = `https://anasommer.com/api/wp-json/wp/v2/posts`;
  const response = await fetch(url);
  const postData = await response.json();

  postData.map((post, index) => {
    return console.log(post, index);
  });
}

getPosts();

// make function that calls getPosts() and has evenlisteners for buttons and renders posts to the page
