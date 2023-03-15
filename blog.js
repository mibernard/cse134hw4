import { cstmConfirm } from "./customdialog.js";

// export var posts = [{"title":"title1","date":"2022-03-08","summary":"sum1"}, {"title":"title2","date":"2023-03-08","summary":"summary2"}];
export var posts = [];

export function deletePost(postID) {
  let dialog = cstmConfirm("Delete post?");
  dialog.addEventListener("close", function () {
    if (this.returnValue) {
      posts.splice(postID, 1);
      console.log(
        posts.length +
          " number of objects. postarray in deletefunction: " +
          posts
      );
      localStorage.setItem("localStoragePosts", JSON.stringify(posts));
      renderPosts();
    }
  });
}

export function editPost(postID) {
  if (postID) {
    let post = posts[postID];
    document.getElementById("title").value = post.title;
    document.getElementById("date").value = post.date;
    document.getElementById("summary").value = post.summary;
    // document.getElementById('postID').value = postID;
  }

  document.querySelector("#addDialog").showModal();

  document.getElementById("addForm").addEventListener("submit", function () {
    posts.splice(postID, 1);
    posts.splice(postID, 0, {
      title: document.getElementById("title").value,
      date: document.getElementById("date").value,
      summary: document.getElementById("summary").value,
    });

    localStorage.setItem("localStoragePosts", JSON.stringify(posts));
  });
  renderPosts();

  // deletePost(postID);
}

export function addPost() {
  let postList = [];
  if (JSON.parse(localStorage.getItem("localStoragePosts")).length != 0) {
    postList = JSON.parse(localStorage.getItem("localStoragePosts"));
  }

  document.getElementById("addForm").addEventListener("submit", function () {
    postList.push({
      title: document.getElementById("title").value,
      date: document.getElementById("date").value,
      summary: document.getElementById("summary").value,
    });

    posts = [...postList];
    localStorage.setItem("localStoragePosts", JSON.stringify(posts));
  });
  renderPosts();
}

export function renderPosts() {
  posts = JSON.parse(localStorage.getItem("localStoragePosts"));
  let markup = "";
  if (posts.length === 0) {
    markup = `No posts to display. There are ${posts.length} posts`;
    console.log("postarray in renderfunction: " + posts);
  } else {
    markup = `
        There are ${posts.length} posts
        <ul>
        ${posts
          .map(
            (post, index) => `
        <li><b>Title:</b> ${post.title} <b>Date:</b> ${post.date} <b>Summary:</b> ${post.summary}        
        <button onclick=editPost(${index})>Edit</button>    
        <button onclick=deletePost(${index})>Delete</button>
        </li>`
          )
          .join("")}
        </ul>`;
  }
  document.querySelector("#blogPosts").innerHTML = markup;
}

export function resetAll() {}

export function setUp() {
  // localStorage.setItem('localStoragePosts', JSON.stringify(posts));
  renderPosts();

  let addDialog = document.getElementById("addDialog");
  document.getElementById("addBtn").addEventListener("click", function () {
    // let dialog = addPost();
    document.getElementById("title").value = "";
    document.getElementById("date").value = "";
    document.getElementById("summary").value = "";
    addDialog.showModal();
    addPost();
  });

  document.getElementById("cancelBtn").addEventListener("click", function () {
    addDialog.close();
  });
}
