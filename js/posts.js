const postsWrapper = document.querySelector(".posts-wrapper");
const loadMorePostsLink = document.querySelector("#load-more");
let postsToShow = 10;

// Make a call to API to get list of posts
async function getAllPosts() {
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

  for (let i = 0; i < postsToShow; i++) {
    const post = `<div class="post-container">
        <div class="post">
          <a href="/specificpost.html?id=${postsArray[i].id}"
            ><img
              src="${postsArray[i].featured_media_src_url}"
              alt="Blog post image"
              class="post-image"
          /></a>
        </div>
        <div class="post post-info">
          <h3 class="post-heading">${postsArray[i].title.rendered}</h3>
          <p class="post-short-desc">
           ${postsArray[i].excerpt.rendered.slice(3, -1)}
          </p>
          <a href="/specificpost.html?id=${
            postsArray[i].id
          }" class="post-link">Read more...</a>
        </div>
      </div>`;
    postsWrapper.innerHTML += post;
  }

  loadMorePostsLink.addEventListener("click", function (e) {
    e.preventDefault();

    for (let x = postsToShow; x < postsArray.length; x++) {
      const newPost = `<div class="post-container">
      <div class="post">
        <a href="/specificpost.html?id=${postsArray[x].id}"
          ><img
            src="${postsArray[x].featured_media_src_url}"
            alt="Blog post image"
            class="post-image"
        /></a>
      </div>
      <div class="post post-info">
        <h3 class="post-heading">${postsArray[x].title.rendered}</h3>
        <p class="post-short-desc">
         ${postsArray[x].excerpt.rendered.slice(3, -1)}
        </p>
        <a href="/specificpost.html?id=${
          postsArray[x].id
        }" class="post-link">Read more...</a>
      </div>
    </div>`;
      postsWrapper.innerHTML += newPost;
      loadMorePostsLink.style.display = "none";
    }
  });
}

getAllPosts();
