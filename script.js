"use strict";

// Start of GET Function
const getMovieFunction = () => {
    fetch("https://vast-marvelous-course.glitch.me/movies", getMovieObject)
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

const getMovieObject = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
};
// End of GET Function

// Start of Delete Function
const deleteMovieFunction = (id) => {

    if (typeof id !== "number") {
        console.log("Please input a valid number...");
    }
    fetch(`https://vast-marvelous-course.glitch.me/movies/${id}`, deleteMovieObject)
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

const deleteMovieObject = {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    }
}
//End of Delete Function

//Start of Post Function
const postMovieFunction = () => {
    fetch(`https://vast-marvelous-course.glitch.me/movies`, postMovieObject)
        .then(result => result.json()).then(data => console.log(data))
        .catch(err => console.log("There has been an error: " + err));
}


const hardCodedTestMovie = {
    "title": "Test Movie",
    "director": "Movie Director",
    "genre": "Test Genre"
}
const postMovieObject = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
//    Hard coding in a post right now, later this will be a user input field.
    body: JSON.stringify(hardCodedTestMovie)
}
//End of Post function


//Start of convert to html function
function convertToHTML() {
    let html = "";
    html += `<div class="card">
        <img class="card-img-top" alt="PUT IMAGE HERE">
        <div class="card-body">
        <h5 class="card-title">Movie Title</h5>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur deleniti deserunt eos officia placeat quis? Accusantium aperiam deserunt dolores esse ipsum iure possimus tenetur velit! Quibusdam ut vero voluptas?</p>
        </div>`
    return html;
}
//End of convert to html function

//Start of send to HTML function
function sendToHTML(data) {
    //...
    //...
    //...
}
//End of send to HTML function


let btn = document.getElementById("btn-to-show");
let btnToDel = document.getElementById("btn-to-delete");
let btnToPost = document.getElementById("btn-to-post");
let btnToPatch = document.getElementById("btn-to-patch");

btn.addEventListener("click", getMovieFunction);

btnToDel.addEventListener("click", (e) => {
    e.preventDefault();
    deleteMovieFunction(7);
});

btnToPost.addEventListener("click", (e) => {
    e.preventDefault();
    postMovieFunction();
});

// btn.addEventListener("click", getMovieFunction);









































// let btn = document.getElementById("btn");
// btn.addEventListener("click", () => {
//     fetch("https://vast-marvelous-course.glitch.me/movies")
//         .then(resp => resp.json())
//         .then(data => console.log(data));
//
//     const reviewObj = {
//         name: 'Codey',
//         rating: 5,
//         comments: "This is a really good place for coding and eating"
//     };
//
//     const object =
//         {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         }
//
//     fetch("https://vast-marvelous-course.glitch.me/movies/260", object)
//         .then(resp => console.log(resp))
//         .catch(err => console.log(err));
//
//     fetch("https://vast-marvelous-course.glitch.me/movies")
//         .then(resp => resp.json())
//         .then(data => console.log(data));
// });