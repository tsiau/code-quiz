// Required elements
var start_btn = document.querySelector(".start-btn");
var info_box = document.querySelector(".info-box");
var exit_btn = info_box.querySelector(".buttons .quit");
var continue_btn = info_box.querySelector(".buttons .restart");
var quiz_box = document.querySelector(".wrapper");

// If start quiz button is clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); // show the info box
}

// If exit button is clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // hide the info box
}

// If continue button is clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // hide the info box
    quiz_box.style.display = "block"; // show the quiz box
    start_btn.classList.remove("show"); // hide the start button
}
