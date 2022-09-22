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

const displayMovies = () => {
    // Display loading animation while we wait for promise.
    displayLoading();
    fetch("https://vast-marvelous-course.glitch.me/movies", getMovieObject)
        .then(resp => resp.json())
        .then(data => {
            hideLoading();
            let moviesToDisplay = convertToHTML(data);
            movies.innerHTML = moviesToDisplay;

            //This is the event listener to edit movies
            let editButtons = document.getElementsByClassName("edit-btn");

            for (let button of editButtons) {
                //Start of red edit button event listener
                button.addEventListener("click", () => {
                    button.parentElement.nextElementSibling.classList.toggle("hidden");
                })
            //    End of red edit button event listener
            }

            // Start of for loop to initalize confirm edit button event listeners
            let confirmEditButtons = document.getElementsByClassName("btn-to-confirm-edit");
            for (let button of confirmEditButtons) {
                button.addEventListener("click", () => {
                //  INSIDE HERE IS GOING TO BE THE PATCH FUNCTION
                    const patchMovieFunction = (id) => {
                        fetch(`https://vast-marvelous-course.glitch.me/movies/${id}`, patchMovieObject)
                            .then(result => result.json()).then(data => {
                                displayMovies();
                                return console.log(data);
                        })
                            .catch(err => console.log("There has been an error: " + err));
                    }

                    const userInputPatchValue = {
                        "title": button.parentElement.children[2].value,
                        "director": button.parentElement.children[5].value,
                        "rating": button.parentElement.children[8].value,
                        "genre": button.parentElement.children[11].value
                    }
                    const patchMovieObject = {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        //    Hard coding in a post right now, later this will be a user input field.
                        body: JSON.stringify(userInputPatchValue)
                    }
                    patchMovieFunction(button.parentElement.parentElement.children[0].innerHTML);
                    // console.log(button.parentElement.parentElement.children[0].innerHTML);
                });
            }
            // End of for loop to initalize confirm edit button event listeners

            // Start of delete functionality
            let deleteButtons = document.getElementsByClassName("delete-btn");
            for (let button of deleteButtons) {
                button.addEventListener("click", (e) => {
                    e.preventDefault();
                    let currentBtnId = button.parentElement.parentElement.children[0].innerHTML;
                    console.log(currentBtnId);
                    const deleteMovieFunction = (id) => {
                        fetch(`https://vast-marvelous-course.glitch.me/movies/${id}`, deleteMovieObject)
                            .then(resp => resp.json())
                            .then(data => {
                                displayMovies();
                                return console.log(data);
                            })
                            .catch(err => console.log(err));
                    }
                    const deleteMovieObject = {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                    deleteMovieFunction(currentBtnId);
                });
            }
            // End of delete functionality

            // Start of favoriting functionality

            let favoriteButtons = document.getElementsByClassName("star");
            for (let button of favoriteButtons) {
                button.addEventListener("click", (e) => {
                    e.preventDefault();
                    button.classList.toggle("favorited");
                })
            }






            // End of favoriting functionality
        })
        .catch(err => console.log(err));
}




//Start of convert to html function
function convertToHTML(data) {
    let html = "";
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        html += `<div class="card me-5 mb-5" style="width: 301px;">
                    <span class="hidden">${data[i].id}</span>
                    <img src="img/movie-banner.jpeg" class="card-img-top movie-banner" alt="PUT IMAGE HERE">
                    <div class="card-body">
                        <h5 class="card-title">${data[i].title}</h5>
                        <h5 class="card-title fs-6">${data[i].director}</h5>
                        <p class="card-text">${data[i].rating}</p>
                        <p class="card-text">${data[i].genre}</p>
                        <button class="edit-btn btn btn-sm bg-primary text-white" type="button">Edit Movie</button>
                        <button class="delete-btn btn btn-sm bg-danger text-white" type="button">Delete Movie</button>
                        <i class="fa-regular fa-star star"></i>
                    </div>
<!--                    Start of edit form                  -->
                    <form class="edit-form hidden">
                        <p>Edit This Movie</p>
                        <label class="form-label" for="edit-movie-title">Title: </label>
                        <input class="form-control w-75" name="edit-movie-title" id="edit-movie-title" type="text" placeholder="${data[i].title}">
                        <br>
                        <label class="form-label" for="edit-movie-director">Director: </label>
                        <input class="form-control w-75" name="edit-movie-director" id="edit-movie-director" type="text" placeholder="${data[i].director}">
                        <br>
                        <label class="form-label" for="edit-movie-rating">Rating: </label>
                        <select class="form-select w-50" name="edit-movie-rating" id="edit-movie-rating">
                            <option>Select rating</option>
                            <option value="G">G</option>
                            <option value="PG">PG</option>
                            <option value="PG-13">PG-13</option>
                            <option value="R">R</option>
                        </select>
                        <br>
                        <label class="form-label" for="edit-movie-genre">Genre: </label>
                        <select class="form-select w-50" name="edit-movie-genre" id="edit-movie-genre">
                            <option>Select genre</option>
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Romance">Romance</option>
                            <option value="Drama">Drama</option>
                            <option value="Crime">Crime</option>
                            <option value="Horror">Horror</option>
                        </select>
                        <br>
                        <button type="button" class="btn-to-confirm-edit btn btn-sm btn-primary">Edit</button>
                    </form>  
<!--                      End of edit form                   -->
                </div>`

    }
    return html;
}
//End of convert to html function

const displayLoading = () => {
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 10000);
}

const hideLoading = () => {
    loader.classList.remove("display");
}

const loader = document.getElementById("loading");
const btn = $("#btn-to-show");
const btnToDel = document.getElementById("btn-to-delete");
const btnToPost = document.getElementById("btn-to-post");
const btnToPatch = document.getElementById("btn-to-patch");
const movies = document.getElementById("movies");

btn.on("click", getMovieFunction);

//Start of post functionality
btnToPost.addEventListener("click", (e) => {
    e.preventDefault();
    const postMovieFunction = () => {
        fetch(`https://vast-marvelous-course.glitch.me/movies`, postMovieObject)
            .then(result => result.json()).then(data => {
                displayMovies();
                postMovieTitle.value = "";
                postMovieDirector.value = "";
                postMovieGenre.value = "";
                postMovieRating.value = "";
                return console.log(data);
        })
            .catch(err => console.log("There has been an error: " + err));
    }
    let postMovieTitle = document.getElementById("add-movie-title");
    let postMovieDirector = document.getElementById("add-movie-director");
    let postMovieRating = document.getElementById("add-movie-rating");
    let postMovieGenre = document.getElementById("add-movie-genre");

    const userEnteredMovie = {
        "title": postMovieTitle.value,
        "director": postMovieDirector.value,
        "genre": postMovieGenre.value,
        "rating": postMovieRating.value
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
//End of post functionality
//Display on page load
displayMovies();
