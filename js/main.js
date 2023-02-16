const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");
const slider = document.querySelector("#slider");
const loader = document.querySelector(".loader-container");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#previous");

// Start & End Slide index
let startIndex = 0;
let endIndex = 3;

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

async function renderPosts() {
  // Get posts array
  try {
    const url = `https://anasommer.com/api/wp-json/wp/v2/posts/?per_page=100`;
    const response = await fetch(url);
    const postsArray = await response.json();
    // Call function to show posts on a page
    createHtml(postsArray);
  } catch (error) {
    console.log(error);
  }
}

function createHtml(postsArray) {
  loader.style.display = "none";

  function showPost(postsArray, startIndex, endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
      const id = postsArray[i].id;
      console.log(id);
      const image = postsArray[i].featured_media_src_url;
      const title = postsArray[i].title.rendered;
      const shortDesc = postsArray[i].excerpt.rendered.slice(3, -1);

      post = ` <div class="post">
      <a href=""
      ><img
        src="${image}"
        alt="Blog post image"
        class="post-image thumbnail"
    /></a>
    <h3 class="post-heading">
      ${title}
    </h3>
    <p class="post-short-desc latest-short-desc">
      ${shortDesc}
    </p>
    <a href="" class="post-link">Read more...</a>
    </div>`;

      slider.innerHTML += post;
    }
  }

  // Next button
  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    slider.innerHTML = ``;
    if (endIndex === 12) {
      startIndex = 9;
      endIndex = 12;
      showPost(postsArray, startIndex, endIndex);
    } else {
      startIndex += 3;
      endIndex += 3;
      showPost(postsArray, startIndex, endIndex);
    }
  });

  // Next button
  prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    slider.innerHTML = ``;
    if (startIndex === 0) {
      startIndex = 0;
      endIndex = 3;

      showPost(postsArray, startIndex, endIndex);
    } else {
      startIndex -= 3;
      endIndex -= 3;
      showPost(postsArray, startIndex, endIndex);
    }
  });

  showPost(postsArray, startIndex, endIndex);
}

renderPosts();
// make function that calls getPosts() and has evenlisteners for buttons and renders posts to the page
