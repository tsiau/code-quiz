// Required elements
const start_btn = document.querySelector(".start-btn button");
const info_box = document.querySelector(".info-box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".wrapper");
const submit_btn = document.getElementById("submit-btn");
const play_again_btn = document.getElementById("play-again");
const usernameInput = document.getElementById("username-input");
const saveScoreBtn = document.getElementById("save-score-btn");
const highscorePage = document.querySelector(".highscore-page");
const highscoreList = document.querySelector(".highscore-list");
const scoreValue = document.getElementById("score");
const option_list = document.querySelector(".quiz-options");

// Initialize score variable
let score = 0;
let que_count = 0; // Move que_count here to keep track of the current question index
const timeLimit = 60; // Set the time limit for the quiz in seconds
const penaltyTime = 5; // 5 seconds penalty for each wrong answer
let timeLeft = timeLimit; // Set the initial time in seconds

// Declare and initialize storedHighscores as an empty array
let storedHighscores = [
  { name: "John Doe", score: 10 },
  { name: "Jane Smith", score: 8 },
];

// Function to hide the highscore page and reset the inputs
function hideHighscorePage() {
  highscorePage.classList.remove("activeHighscore"); // Hide the highscore page
  saveScoreBtn.classList.add("hidden"); // Hide the "Save Score" button
  usernameInput.classList.add("hidden"); // Hide the username input field
  usernameInput.value = ""; // Reset the input field
}

// Function to display the highscore entries
function displayHighscores() {
  // Retrieve highscores from Local Storage
  storedHighscores = JSON.parse(localStorage.getItem("highscores")) || [];

  // Get a reference to the highscore list element
  const highscoreList = document.querySelector(".highscore-list");

  // Clear any existing highscore entries
  highscoreList.innerHTML = "";

  // Sort the highscores in descending order (highest score first)
  storedHighscores.sort((a, b) => b.score - a.score);

  // Iterate through the highscores and create list items
  storedHighscores.forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
    highscoreList.appendChild(listItem);
  });
}

// Function to show the highscore page
function showHighscorePage() {
  highscorePage.style.display = "block" // Unhiding High Scores page
  quiz_box.classList.remove("activeQuiz"); // Hide the quiz box
  highscorePage.classList.add("activeHighscore"); // Show the highscore page
  usernameInput.classList.remove("hidden"); // Show the username input field
  saveScoreBtn.classList.remove("hidden"); // Show the "Save Score" button
  let submitButton = document.getElementById("submit-btn"); // Get the submit button element by its ID
  submitButton.style.display = "none"; // Hude the submit button
  play_again_btn.classList.remove("hidden"); // Show the "Play Again" button

 // Call the displayHighscores function when the highscore page is displayed
document.querySelector(".highscore-page").style.display = "block";
  displayHighscores(); // Display the highscore entries
}

function handleQuizSubmission() {
  // Retrieve the username from the input field
  const username = usernameInput.value;

  if (!username) {
    // ...
  }

  // Check if the score already exists in storedHighscores
  const existingScoreIndex = storedHighscores.findIndex(
    (entry) => entry.score === score
  );

  if (existingScoreIndex !== -1) {
    // Mark the pre-saved score as not new
    storedHighscores[existingScoreIndex].newScore = false;
  } else {
    // Save the new score and username to Local Storage
    storedHighscores.push({ name: username, score: score, newScore: true });
    localStorage.setItem("highscores", JSON.stringify(storedHighscores));
  }

  // Call the function to display highscore entries
  displayHighscores();

  // Display the highscore page with the saved highscores
  showHighscorePage();
}


// If start button is clicked
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); // Show the info box
};

// If exit button is clicked
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // Hide the info box
};

// If continue button is clicked
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // Hide the info box
  quiz_box.style.display = "block"; // Show the quiz box
  start_btn.classList.remove("show"); // Hide the start button
  showQuestions(que_count); // Display the first question
  startTimer(); // Start the timer when the quiz starts
};

// Add an event listener to the username input to enable/disable the "Save Score" button
usernameInput.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !usernameInput.value;
});

// Function to start the timer
let timerInterval;

function startTimer() {
  // Update the timer-sec element every second
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      document.querySelector(".timer-sec").textContent = timeLeft;
    } else {
      // Time is up, stop the timer and show the highscore page
      clearInterval(timerInterval);
      showHighscorePage();
    }
  }, 1000);
}

// If "Submit" button is clicked
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
    scoreValue.textContent = score;
  } else {
    // If wrong, penalize by reducing time
    if (timeLeft >= penaltyTime) {
      timeLeft -= penaltyTime;
    } else {
      timeLeft = 0;
      // Time is up, stop the timer and show the highscore page
      clearInterval(timerInterval);
      showHighscorePage();
      return; // Exit the function early to avoid further execution
    }
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
    // No more questions, show the final score
    que_text.innerHTML = "Congratulations! You have completed the quiz.";
    option_list.innerHTML = "";
    showResult();
    showHighscorePage();

    // Stop the timer when the quiz is completed
    clearInterval(timerInterval);

    // Show the "Save Score" button and the username input field
    saveScoreBtn.classList.remove("hidden");
    usernameInput.classList.remove("hidden");

    // Hide the "Submit" button
    submit_btn.classList.add("hidden");
  }
};

// If "Save Score" button is clicked
saveScoreBtn.onclick = handleQuizSubmission;

// Define que_text at the global scope
let que_text = document.querySelector(".quiz-question");

// Function to display the current question
function showQuestions(que_count) {
  // Check if there are more questions to display
  if (que_count >= questions.length) {
    // No more questions, do something like showing the final score
    que_text.innerHTML = "Congratulations! You have completed the quiz.";
    option_list.innerHTML = "";
    showResult(); // Call the function to display the final score
    return;
  }

  // Get the current question object from the questions array
  var currentQuestion = questions[que_count];

  // Display the question text
  que_text.innerHTML = "<span>" + currentQuestion.question + "</span>";

  // Display the options for the current question
  var option_tag = "<ul class='quiz-options'>";
  for (var i = 0; i < currentQuestion.options.length; i++) {
    option_tag += "<li class='option'>" + currentQuestion.options[i] + "</li>";
  }
  option_tag += "</ul>";

  option_list.innerHTML = option_tag;

  // Add event listener to each option to toggle "selected" class
  var options = option_list.querySelectorAll(".option");
  options.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove "selected" class from all options
      options.forEach((opt) => opt.classList.remove("selected"));

      // Add "selected" class to the clicked option
      this.classList.add("selected");
    });
  });
}

function showResult() {
  // Hide the question and options
  que_text.innerHTML = "";
  option_list.innerHTML = "";

  // Display the final score
  let result_tag = "<span>You scored " + score + " out of " + questions.length + ".</span>";
  que_text.innerHTML = result_tag;

  // Show the "Play Again" button
  play_again_btn.style.display = "block";

  // Stop the timer when the quiz is completed
  clearInterval(timerInterval);

  // Display the high scores
  displayHighscores();
}
  
// Function to reset the quiz and show the start button again
function resetQuiz() {
  que_count = 0;
  score = 0; // Reset the score
  timeLeft = timeLimit; // Reset the time to the initial value (60 seconds)
  clearInterval(timerInterval); // Stop the timer
  scoreValue.textContent = "0"; // Reset the score display
  showQuestions(que_count);
  quiz_box.style.display = "none";
  start_btn.classList.add("show");
}

// If "Play Again!" button is clicked
play_again_btn.onclick = () => {
  // Reset the quiz and show the start button again
  que_count = 0;
  score = 0; // Reset the score
  timeLeft = timeLimit; // Reset the time
  clearInterval(timerInterval); // Stop the timer
  showQuestions(que_count);
  quiz_box.style.display = "none";
  start_btn.classList.add("show");

  // Hide the highscore page and reset the inputs
  hideHighscorePage();

  // Call the showHighscorePage() function here
  showHighscorePage();
};

// Hide the "Save Score" button and the input field to enter the username
saveScoreBtn.classList.add("hidden");
usernameInput.classList.add("hidden");
submit_btn.classList.add("hidden");

// Reset the input field and "Save Score" button state
usernameInput.value = "";
saveScoreBtn.disabled = true;

// Call the function to display highscore entries
displayHighscores();
