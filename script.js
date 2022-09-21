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



//Start of Patch function
const patchMovieFunction = (id) => {
    fetch(`https://vast-marvelous-course.glitch.me/movies/${id}`, patchMovieObject)
        .then(result => result.json()).then(data => console.log(data))
        .catch(err => console.log("There has been an error: " + err));
}

const hardCodedPatchMovie = {
    "title": "Patched Test Movie",
    "director": "Patched Movie Director",
}
const patchMovieObject = {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
//    Hard coding in a post right now, later this will be a user input field.
    body: JSON.stringify(hardCodedPatchMovie)
}
//End of Patch function
const getMovieFunctions = () => {
    fetch("https://vast-marvelous-course.glitch.me/movies", getMovieObject)
        .then(resp => resp.json())
        .then(data => {
            let moviesToDisplay = convertToHTML(data);
            console.log(moviesToDisplay);
            movies.innerHTML = moviesToDisplay;
        })
        .catch(err => console.log(err));
}




//Start of convert to html function
function convertToHTML(data) {
    let html = "";
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        html += `<div class="card">
                    <img class="card-img-top" alt="PUT IMAGE HERE">
                    <div class="card-body">
                        <h5 class="card-title">${data[i].title}</h5>
                        <p class="card-text">World</p>
                    </div>
                </div>`
    }
    console.log(html);
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
let movies = document.getElementById("movies");
let btnShowMovies = document.getElementById("btn-to-show-movies");
let deleteID = document.getElementById("deleteInput")

btn.addEventListener("click", getMovieFunction);

btnToDel.addEventListener("click", (e) => {
    e.preventDefault();
    deleteMovieFunction(deleteID.value);

});

btnToPost.addEventListener("click", (e) => {
    e.preventDefault();

    //Start of Post Function
    const postMovieFunction = () => {
        fetch(`https://vast-marvelous-course.glitch.me/movies`, postMovieObject)
            .then(result => result.json()).then(data => console.log(data))
            .catch(err => console.log("There has been an error: " + err));
    }

// let postForm = document.getElementById("addMoviesForm").elements
    let postMovieTitle = document.getElementById("add-movie-title").value;
    let postMovieDirector = document.getElementById("add-movie-director").value;
    let postMovieRating = document.getElementById("add-movie-rating").value;
    let postMovieGenre = document.getElementById("add-movie-genre").value;


    const userEnteredMovie = { // For testing purposes.
        "title": postMovieTitle,
        "director": postMovieDirector,
        "genre": postMovieGenre,
        "rating": postMovieRating
    }
    const postMovieObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userEnteredMovie)
    }
//End of Post function

    postMovieFunction();
    console.log(postMovieTitle)
    console.log(postMovieDirector)
    console.log(postMovieRating)
    console.log(postMovieGenre)
});

btnToPatch.addEventListener("click", (e) => {
    e.preventDefault();
    patchMovieFunction(293);
});

btnShowMovies.addEventListener("click", (e) => {
    e.preventDefault();
    getMovieFunctions();
});
