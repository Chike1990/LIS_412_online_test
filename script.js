let questions = [{
  question: "Which of the following necessitated bibliographic control?",
  choices: ["Information explosion", "Big data", "Mobile technology", "Cyber crime"],
  correctAnswer: 0
}, {
  question: "An example of bibliographic control tool is",
  choices: ["reference", "bot", "SEARS List", "catalogue"],
  correctAnswer: 3
}, {
  question: "What is another name for information explosion called?",
  choices: ["excess data", "big data", "information overload","information control"],
  correctAnswer: 2
}, {
  question: "Which of the following is NOT a type of index?",
  choices: ["Lay index", "author index", "subject index", "title index"],
  correctAnswer: 0
}, {
  question: "The process of preparing and index is known as?",
  choices: ["classifying", "indexing", "abstracting", "cataloguing"],
  correctAnswer: 1
}, {
  question: "Which of the following is a stage in indexing process?",
  choices: ["scanning", "checking", "evaluation", "nesting"],
  correctAnswer: 0	

}, {
  question: "The process of preparing an abstract is called?",
  choices: ["skimming", "indexing", "abstracting", "tracting"],
  correctAnswer: 2	
}, {
  question: "Who invented indexes?",
  choices: ["Ranganathan", "Russel", "A. Jefferson", "None of the above"],
  correctAnswer: 3
}, {
  question: "The following are the component of an empirical abstract except?",
  choices: ["endnote", "result", "objective", "design"],
  correctAnswer: 0

}, {
  question: "Abstracting process involve of the following?",
  choices: ["indexing", "familiarization", "cramming", "none of the above"],
  correctAnswer: 1

}, {
  question: "Which of the following bibliographic control tools best meets researchers needs?",
  choices: ["abstract", "catalogue", "index", "classified index"],
  correctAnswer: 0

}, {
  question: "Bibliographic control tools involves the following Except?",
  choices: ["rare books", "index", "bibliography", "catalogue"],
  correctAnswer: 0
}];

let currentQuestion = 0;
let correctAnswers = 0;
let quizOver = false;


$(document).ready(function () {

  // Display the first question
  displayCurrentQuestion();
  $(this).find(".quizMessage").hide();

  // On clicking next, display the next question
  $(this).find(".nextButton").on("click", function () {
      if (!quizOver) {

          value = $("input[type='radio']:checked").val();

          if (value == undefined) {
              $(document).find(".quizMessage").text("Please select an answer");
              $(document).find(".quizMessage").show();
          } else {
              // TODO: Remove any message -> not sure if this is efficient to call this each time....
              $(document).find(".quizMessage").hide();

              if (value == questions[currentQuestion].correctAnswer) {
                  correctAnswers++;
              }

              currentQuestion++; // Since we have already displayed the first question on DOM ready
              if (currentQuestion < questions.length) {
                  displayCurrentQuestion();
              } else {
                  displayScore();
                  //                    $(document).find(".nextButton").toggle();
                  //                    $(document).find(".playAgainButton").toggle();
                  // Change the text in the next button to ask if user wants to play again
                  $(document).find(".nextButton").text("Play Again?");
                  quizOver = true;
              }
          }
      } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
          quizOver = false;
          $(document).find(".nextButton").text("Next Question");
          resetQuiz();
          displayCurrentQuestion();
          hideScore();
      }
  });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

  console.log("In display current Question");

  let question = questions[currentQuestion].question;
  let questionClass = $(document).find(".quizContainer > .question");
  let choiceList = $(document).find(".quizContainer > .choiceList");
  let numChoices = questions[currentQuestion].choices.length;

  // Set the questionClass text to the current question
  $(questionClass).text(question);

  // Remove all current <li> elements (if any)
  $(choiceList).find("li").remove();

  let choice;
  for (i = 0; i < numChoices; i++) {
      choice = questions[currentQuestion].choices[i];
      $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
  }
}

function resetQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  hideScore();
}

function displayScore() {
  $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
  $(document).find(".quizContainer > .result").show();
}

function hideScore() {
  $(document).find(".result").hide();
}