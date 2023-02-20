const postContainer = document.querySelector(".spec-post-container");
const html = document.querySelector("html");

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const id = parameter.get("id");

const url = `https://anasommer.com/api/wp-json/wp/v2/posts/${id}`;

async function showSpecificPost() {
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
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

function createHtml(post) {
  document.title = `Marathon blog | ${post.title.rendered}`;

  postContainer.innerHTML = `<img
  src="${post.featured_media_src_url}"
  alt="https://anasommer.com/api/wp-json/wp/v2/media/${id + 1}"
  id="spec-post-img"
  class="post-image"
/>
<h2 class="spec-post-heading">How Many Weeks Train To Marathon?</h2>


  <p class="spec-post-text">
    You’ve probably seen 12 to 15-week training plans but I really don’t recommend these. Even 16 leaves me feeling a little unsettled. Unless you’re a seasoned marathoner and you maintain a good base year-round, it’s just not going to be enough time to get the results that you want and without getting hurt (which I will discuss more!). My biggest advice is don’t skimp! If you’re taking the plunge to run a marathon, every single one of those weeks is important.</p>

    <p class="spec-post-text">In my mind, why would you put in the work for a beast like a marathon if you’re not willing to go all-in? If you want to train for a marathon in 12 weeks than that is entirely up to you. If you’re just looking to finish one, and are willing to walk some of it, then choosing to go that route could be completely fine. But my guess is once you cross that finish line (and I’m hoping you can avoid injury along the way), you’ll be wanting for more the next time around.

        <p class="spec-post-text">So, let’s talk about two things that are absolutely necessary for a quality training program when it comes to the marathon distance.</p>
  </p>

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
<p class="date">12 July 2022</p>`;

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
