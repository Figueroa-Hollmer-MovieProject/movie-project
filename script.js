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

const displayMovies = (filter, newArray) => {
    // Display loading animation while we wait for promise.
    displayLoading();
    fetch("https://vast-marvelous-course.glitch.me/movies", getMovieObject)
        .then(resp => resp.json())
        .then(data => {
            hideLoading();

            let favoriteButtons = document.getElementsByClassName("star");

            // Sort by options
            if (filter === undefined && newArray === undefined) {
                let moviesToDisplay = convertToHTML(data);
                console.log(data);
                movies.innerHTML = moviesToDisplay;
            } else if (filter === "genre") {
                movies.innerHTML = convertToHTML(newArray);
            } else if (filter === "rating") {
                movies.innerHTML = convertToHTML(newArray);
            } else if (filter === "favorited") {
                movies.innerHTML = convertToHTML(newArray);
                for (let i = 0; i < favoriteButtons.length; i++) {
                    favoriteButtons[i].style.backgroundColor = "yellow";
                }
            }

            //This is the event listener to edit movies
            let editButtons = document.getElementsByClassName("edit-btn");
            for (let button of editButtons) {
                button.addEventListener("click", () => {
                    button.parentElement.nextElementSibling.classList.toggle("hidden");
                });
            }

            // Start of for loop to confirm edit button event listeners
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
                });
            }
            // End of for loop to confirm edit button event listeners

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
            // let favoriteButtons = document.getElementsByClassName("star");
            for (let i = 0; i < data.length; i++) {
                favoriteButtons[i].addEventListener("click", (e) => {
                    e.preventDefault();
                    if (data[i].favorited === true) {
                        favoriteButtons[i].style.backgroundColor = "white"
                        console.log("now it's white")
                        data[i].favorited = false;
                        console.log(data[i])
                    } else {
                        favoriteButtons[i].style.backgroundColor = "yellow";
                        console.log("now it's yellow")
                        data[i].favorited = true;
                        console.log(data[i])
                    }
                });
            }
            // End of favoriting functionality
            const sortByFavorite = document.getElementById("movie-filter-favorited");
            sortByFavorite.addEventListener("change", (e) => {
               e.preventDefault();
               if (sortByFavorite.value === "true") {
                   let favoritedArray = data.filter((n) => {
                        return n.favorited === true;
                    });
                    displayMovies("favorited", favoritedArray);
               } else {
                   displayMovies();
               }
            });

            // Start of "Sort by Genre" filter functionality
            const sortBy = document.getElementById("movie-filter-genre");
            sortBy.addEventListener("change", (e) => {
                let array = [];
                if (sortBy.value === "none") {
                    array = data;
                } else {
                    array = data.filter((n) => {
                        return n.genre.toLowerCase().includes(`${sortBy.value}`);
                    });
                }
                displayMovies("genre", array);
            });

            //Start of sort by name function
            let sortByNameField = document.getElementById("search-by-name");
            sortByNameField.addEventListener("keyup", (e) => {
                e.preventDefault();
                let searchingArr = [];
                searchingArr = data.filter((n) => n.title.toLowerCase().includes(sortByNameField.value));
                movies.innerHTML = convertToHTML(searchingArr);
            });

            // Start of sort by rating
            const sortByRating = document.getElementById("movie-filter-rating");
            sortByRating.addEventListener("change", (e) => {
               let ratingArray = [];
               if (sortByRating.value === "none") {
                   ratingArray = data;
               } else {
                   ratingArray = data.filter((n) => {
                       return n.rating === sortByRating.value;
                   });
               }
               displayMovies("rating", ratingArray);
            });
        })
        .catch(err => console.log(err));
}

//Start of convert to html function
function convertToHTML(data) {
    let html = "";
    for (let i = 0; i < data.length; i++) {
        html += `<div class="card me-5 mb-5 bg-dark" style="width: 301px;">
                    <span class="hidden">${data[i].id}</span>
                    <img src="${data[i].poster}" class="card-img-top movie-banner" alt="PUT IMAGE HERE">
                    <div class="card-body">
                        <h5 class="card-title text-white fw-bold">${data[i].title}</h5>
                        <h5 class="card-title fs-6 text-white">${data[i].director}</h5>
                        <p class="card-text text-white">${data[i].rating}</p>
                        <p class="card-text text-white">${data[i].genre}</p>
                        <button class="edit-btn btn btn-sm bg-primary text-white" type="button">Edit Movie</button>
                        <button class="delete-btn btn btn-sm bg-danger text-white" type="button">Delete Movie</button>
                        <i class="fa-regular fa-star star"></i>
                    </div>
<!--                    Start of edit form                  -->
                    <form class="edit-form hidden">
                        <p>Edit This Movie</p>
                        <label class="form-label text-white" for="edit-movie-title">Title: </label>
                        <input class="form-control w-75" name="edit-movie-title" id="edit-movie-title" type="text" placeholder="${data[i].title}">
                        <br>
                        <label class="form-label text-white" for="edit-movie-director">Director: </label>
                        <input class="form-control w-75" name="edit-movie-director" id="edit-movie-director" type="text" placeholder="${data[i].director}">
                        <br>
                        <label class="form-label text-white" for="edit-movie-rating">Rating: </label>
                        <select class="form-select w-50" name="edit-movie-rating" id="edit-movie-rating">
                            <option>Select rating</option>
                            <option value="G">G</option>
                            <option value="PG">PG</option>
                            <option value="PG-13">PG-13</option>
                            <option value="R">R</option>
                        </select>
                        <br>
                        <label class="form-label text-white" for="edit-movie-genre">Genre: </label>
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
    }, 60000);
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
            .then(result => result.json())
            .then(data => {
                displayMovies();
                postMovieTitle.value = "";
                postMovieDirector.value = "";
                postMovieGenre.value = "";
                postMovieRating.value = "";
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

    let postMovieObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userEnteredMovie)
    }

    let title = userEnteredMovie.title;
    fetch(`https://www.omdbapi.com?t=${title}&apikey=thewdb`)
        .then(resp => resp.json())
        .then(data => {
            userEnteredMovie.poster = data.Poster;
            postMovieObject = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userEnteredMovie)
            }
            postMovieFunction();
        })
        .catch(err => console.log(err))
});
//End of post functionality
//Display on page load
displayMovies();
