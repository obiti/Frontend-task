const question = document.getElementById("question");
const nextButton = document.getElementById("next-btn");
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const options = Array.from(document.getElementsByClassName("options-text"));
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let quizOption1 = document.getElementById("option-1");
let quizOption2 = document.getElementById("option-2");
let quizOption3 = document.getElementById("option-3");
let quizOption4 = document.getElementById("option-4");

let questions = [
  {
    question:
      "CSS stands for____",
    option1: "Computer Styled Sections",
    option2: "Cascading Style Sheets",
    option3: "Crazy Solid Shapes",
    option4: "None of the above",
    answer: 2,
  },
  {
    question: `___ is a W3C spec that allows cross-domain communication from the browser`,
    option1: "Cascading Operation Read Sheets",
    option2: "Cross Over Real Solutions",
    option3: "Crazy Solid Shapes",
    option4: "Cross-Origin Resource Sharing",
    answer: 4,
  },
  {
    question:
      "A collection of data containing both properties and methods is called ____",
    option1: "Tag",
    option2: "Selector",
    option3: "Object",
    option4: "Class"
    answer: 3,
  },
  {
    question:
      "SEO stands for ____",
    option1: "Secret Enterprise Organization",
    option2: "Special Endowment Opportunity",
    option3: "Search Engine Optimization",
    option4: "Seals end Olives",
    answer: 3,
  },
  {
    question:
      "What should be the very last thing in an HTML document?",
    option1: "The heading",
    option2: "Title",
    option3: "Body",
    option4: "Doc type",
    answer: 4,
  },
];

// Constants
const Correct_Point = 20;
const Max_Questions = 5;

startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= Max_Questions) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("quiz5.html");
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter} of ${Max_Questions}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  options.forEach((option) => {
    const number = option.dataset["number"];
    option.innerText = currentQuestion["option" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedOption = e.target;
    const selectedAnswer = selectedOption.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      increaseScore(Correct_Point);
      selectedOption.parentElement.classList.add(classToApply);
    } else {
      selectedOption.parentElement.classList.add(classToApply);

      if (currentQuestion.answer === 1) {
        quizOption1.classList.add("correct");
      } else if (currentQuestion.answer === 2) {
        quizOption2.classList.add("correct");
      } else if (currentQuestion.answer === 3) {
        quizOption3.classList.add("correct");
      } else if (currentQuestion.answer === 4) {
        quizOption4.classList.add("correct");
      }
    }

    setTimeout(() => {
      quizOption1.classList.remove("correct");
      quizOption2.classList.remove("correct");
      quizOption3.classList.remove("correct");
      quizOption4.classList.remove("correct");
      selectedOption.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 650);
  });
});

nextButton.addEventListener("click", (event) => {
  getNewQuestion();
});

increaseScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startQuiz();