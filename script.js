"use strict";

// GET Function
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

// Delete Function
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



let btn = document.getElementById("btn-to-show");
let btnToDel = document.getElementById("btn-to-delete");
let btnToPost = document.getElementById("btn-to-post");
let btnToPatch = document.getElementById("btn-to-patch");

btn.addEventListener("click", getMovieFunction);

btnToDel.addEventListener("click", (e) => {
    e.preventDefault();
    deleteMovieFunction(263);
});

// btn.addEventListener("click", getMovieFunction);

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