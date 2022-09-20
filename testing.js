"use strict";
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

let button = document.getElementById("button")
let div = document.getElementById("main")

button.addEventListener("click", function() {
    div.innerHTML = convertToHTML();
})