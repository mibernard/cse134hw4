import { cstmConfirm } from './customdialog.js'

export var posts = [];

export function deletePost(postID) {
    let dialog = cstmConfirm('Delete post?');
    dialog.addEventListener('close', function () {
        if(this.returnValue) {
            posts.splice(postID,1);
            renderPosts();
        }
    })
}

export function editPost(postID) {
    if (postID) {
        let post = posts[postID];
        document.getElementById('title').value = post.title;
        document.getElementById('date').value = Number(post.date);
        document.getElementById('summary') = post.summary;
        document.getElementById('postID').value = postID;
    }
    document.querySelector('#addDialog').showModal();
}

export function addPost() {
    let addDialog = document.getElementById("addDialog");
        
    document.body.appendChild(addDialog);
    addDialog.showModal();   

}

export function renderPosts() {
    let markup = '';
    if(posts.length===0) 
        markup = 'No posts to display';
    else {
        markup = `
        <ul>
        ${posts.map((post,index) => `
        <li>${post.title} (${post.date}) - Summary: ${post.summary}
        <button onclick="editPost(${index})">Edit</button>
        <button onclick="deletePost(${index})>Delete</button>
        </li>`
        ).join('')}
        </ul>`;
    }
    document.querySelector('#postList').innerHTML = markup;
}

export function resetAll() {}

export function setUp() {
    
    document.getElementById('addBtn').addEventListener('click', function() {
        let dialog = addPost();
    }); 
}