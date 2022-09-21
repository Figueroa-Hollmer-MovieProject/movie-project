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
// const patchMovieFunction = (id) => {
//     fetch(`https://vast-marvelous-course.glitch.me/movies/${id}`, patchMovieObject)
//         .then(result => result.json()).then(data => console.log(data))
//         .catch(err => console.log("There has been an error: " + err));
// }
//
// const hardCodedPatchMovie = {
//     "title": "Patched Test Movie",
//     "director": "Patched Movie Director",
// }
// const patchMovieObject = {
//     method: "PATCH",
//     headers: {
//         "Content-Type": "application/json"
//     },
// //    Hard coding in a post right now, later this will be a user input field.
//     body: JSON.stringify(hardCodedPatchMovie)
// }
//



//End of Patch function
const displayMovies = () => {
    fetch("https://vast-marvelous-course.glitch.me/movies", getMovieObject)
        .then(resp => resp.json())
        .then(data => {
            let moviesToDisplay = convertToHTML(data);
            movies.innerHTML = moviesToDisplay;

            //This is the event listener to edit movies
            let editButtons = document.getElementsByClassName("edit-btn");
            // console.log(editBtn[1])

            for (let button of editButtons) {

                //Start of event listener
                button.addEventListener("click", () => {
                    button.parentElement.nextElementSibling.classList.toggle("hidden");




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

                })
            //    End of event listener



            }

        })
        .catch(err => console.log(err));
}




//Start of convert to html function
function convertToHTML(data) {
    let html = "";
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        html += `<div class="card w-50 mb-5">
                    <img class="card-img-top" alt="PUT IMAGE HERE">
                    <div class="card-body">
                        <h5 class="card-title">${data[i].title}</h5>
                        <h5 class="card-title">${data[i].director}</h5>
                        <p class="card-text">${data[i].rating}</p>
                        <p class="card-text">${data[i].genre}</p>
                        <button class="edit-btn btn bg-danger text-white" type="button">Edit Movie</button>
                    </div>
<!--                    Start of edit form                  -->

                    <form class="edit-form hidden">
                        <p>Edit This Movie</p>
                        <label for="edit-movie-title">Title: </label>
                        <input name="edit-movie-title" id="edit-movie-title" type="text" placeholder="${data[i].title}">
                        <br>
                        <label for="edit-movie-director">Director: </label>
                        <input name="edit-movie-director" id="edit-movie-director" type="text" placeholder="${data[i].director}">
                        <br>
                        <label for="edit-movie-rating">Rating: </label>
                        <input name="edit-movie-rating" id="edit-movie-rating" type="text" placeholder="${data[i].rating}">
                        <br>
                        <label for="edit-movie-genre">Genre: </label>
                        <input name="edit-movie-genre" id="edit-movie-genre" type="text" placeholder="${data[i].genre}">
                        <br>
                        <button type="button" id="btn-to-post">Post</button>
                    </form>
                    
<!--                      End of edit form                   -->
                </div>`

    }
    return html;
}
//End of convert to html function

let btn = $("#btn-to-show");
let btnToDel = document.getElementById("btn-to-delete");
let btnToPost = document.getElementById("btn-to-post");
let btnToPatch = document.getElementById("btn-to-patch");
let movies = document.getElementById("movies");
let btnShowMovies = document.getElementById("btn-to-show-movies");
let deleteID = document.getElementById("deleteInput");

btn.on("click", getMovieFunction);

btnToDel.addEventListener("click", (e) => {
    e.preventDefault();
    deleteMovieFunction(deleteID.value);

});

btnToPost.addEventListener("click", (e) => {
    e.preventDefault();
    const postMovieFunction = () => {
        fetch(`https://vast-marvelous-course.glitch.me/movies`, postMovieObject)
            .then(result => result.json()).then(data => console.log(data))
            .catch(err => console.log("There has been an error: " + err));
    }
    let postMovieTitle = document.getElementById("add-movie-title").value;
    let postMovieDirector = document.getElementById("add-movie-director").value;
    let postMovieRating = document.getElementById("add-movie-rating").value;
    let postMovieGenre = document.getElementById("add-movie-genre").value;

    const userEnteredMovie = {
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
    postMovieFunction();
});

btnToPatch.addEventListener("click", (e) => {
    e.preventDefault();
    patchMovieFunction(293);
});

btnShowMovies.addEventListener("click", (e) => {
    e.preventDefault();
});

displayMovies();
