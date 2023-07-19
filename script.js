// Required elements
var start_btn = document.querySelector(".start-btn button");
var info_box = document.querySelector(".info-box");
var exit_btn = info_box.querySelector(".buttons .quit");
var continue_btn = info_box.querySelector(".buttons .restart");
var quiz_box = document.querySelector(".wrapper");
var submit_btn = document.getElementById("submit");
var play_again_btn = document.getElementById("play-again");

// Initialize score variable
var score = 0;

// If start quiz button is clicked
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); // show the info box
};

// If exit button is clicked
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // hide the info box
};

// If continue button is clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // hide the info box
    quiz_box.style.display = "block"; // show the quiz box
    start_btn.classList.remove("show"); // hide the start button
    showQuestions(0); // Display the first question
  };
  
  let que_count = 0;
  
  function showQuestions(index) {
    var que_text = document.querySelector(".quiz-question");
    var option_list = document.querySelector(".quiz-options");
  
    // Check if there are more questions
    if (index >= questions.length) {
      // No more questions, do something like showing the final score
      que_text.innerHTML = "Congratulations! You have completed the quiz.";
      option_list.innerHTML = "";
      return;
    }
  
    let que_tag = "<span>" + questions[index].question + "</span>";
    let option_tag =
      "<ul class='quiz-options'>" +
      "<li>" +
      questions[index].options[0] +
      "</li>" +
      "<li>" +
      questions[index].options[1] +
      "</li>" +
      "<li>" +
      questions[index].options[2] +
      "</li>" +
      "<li>" +
      questions[index].options[3] +
      "</li>" +
      "</ul>";
  
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
  
    // Add event listener to each option to toggle "selected" class
    let options = option_list.querySelectorAll("li");
    options.forEach((option) => {
      option.addEventListener("click", function () {
        // Remove "selected" class from all options
        options.forEach((opt) => opt.classList.remove("selected"));
  
        // Add "selected" class to the clicked option
        this.classList.add("selected");
      });
    });
  
//If submit button is clicked
submit_btn.onclick = () => {
    // Get selected option
    let userAnswer = option_list.querySelector("li.selected");
  
    if (!userAnswer) {
      // If no option is selected, prompt the user to select one
      alert("Please select an option.");
      return;
    }
  
    // Get the text of the selected option
    let userAnswerText = userAnswer.textContent.trim();
  
    // Get the correct answer text from the questions array
    let correctAnswerText = questions[que_count].answer;
  
    // Check if the selected option is correct
    if (userAnswerText === correctAnswerText) {
      // If correct, increment the score
      score++;
      // Update the score display
      document.getElementById("score").textContent = score;
    }
  
    // Clear the selected option for the next question
    userAnswer.classList.remove("selected");
  
    // Move to the next question
    que_count++;
  
    // Check if there are more questions
    if (que_count < questions.length) {
      // Show the next question
      showQuestions(que_count);
    } else {
      // No more questions, display the final score
      showResult();
    }
};
  }
// Function to show the final score
function showResult() {
  var que_text = document.querySelector(".quiz-question");
  var option_list = document.querySelector(".quiz-options");

  // Hide the question and options
  que_text.innerHTML = "";
  option_list.innerHTML = "";

  // Display the final score
  let result_tag =
    "<span>You scored " + score + " out of " + questions.length + ".</span>";
  que_text.innerHTML = result_tag;

  // Show the "Play Again" button
  play_again_btn.style.display = "block";
}

// If play again button is clicked
play_again_btn.onclick = () => {
  // Reset the quiz and show the start button again
  que_count = 0;
  score = 0; // Reset the score
  showQuestions(que_count);
  quiz_box.style.display = "none";
  start_btn.classList.add("show");
};
