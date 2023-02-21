const postContainer = document.querySelector(".spec-post-container");
const html = document.querySelector("html");

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const id = parameter.get("id");

// Post url
const url = `https://anasommer.com/api/wp-json/wp/v2/posts/${id}`;

// Image url
const imgUrl = `https://anasommer.com/api/wp-json/wp/v2/media/${
  Number(id) + 1
}`;

async function showSpecificPost() {
  try {
    const response = await fetch(url);
    const result = await response.json();
    createHtml(result);
  } catch (error) {
    console.log(error);
    postContainer.classList.remove("lds-ring");
    postContainer.innerHTML = message(
      "Something went wrong, please reload the page",
      error
    );
  }
}

async function getPostImage() {
  try {
    const response = await fetch(imgUrl);
    const data = await response.json();
    const img = document.querySelector("#spec-post-img");
    return (img.alt = data.alt_text);
  } catch (error) {
    console.log(error);
  }
}

function createHtml(post) {
  document.title = `Marathon blog | ${post.title.rendered}`;

  const imgAlt = getPostImage();
  postContainer.innerHTML = `<img
  src="${post.featured_media_src_url}"
  alt="${imgAlt}"
  id="spec-post-img"
  class="post-image"
/>
<h2 class="spec-post-heading">${post.title.rendered}</h2>


  ${post.content.rendered}

</div>
<div class="modal-container">
<div class="modal">
<img
  src="${post.featured_media_src_url}"
  alt="running shoes"
  id="modal-img"
  class="post-image"
/>
</div></div>

<img
src="img/separator-logo.jpg"
alt="3 running shoes "
id="separator-logo"
class="spec-post-separator"
/>
`;

  const modal = document.querySelector(".modal-container");
  const img = document.querySelector("#spec-post-img");
  img.addEventListener("click", function () {
    if (window.innerWidth >= "1000") {
      modal.style.display = "block";
    }
  });
  window.addEventListener("click", function (e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });
}

showSpecificPost();
