var questionDisplay = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var progressText = document.getElementById("progressText");
var scoreText = document.getElementById("score");
var progressBarFull = document.getElementById("progressBarFull");
var loader = document.getElementById("loader");
var game = document.getElementById("game");
var timerBtn = ('timer');
var displayAllChoices = document.getElementById("choices");
var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuesions = [];
var timerId;
var time = (questions.length)* 10;
var currentQuestionIndex = 0;

//
//
//

function startQuiz() {
    timerId = setInterval(clock, 1000);
    timerBtn.textContext = time;
    getQuestion();
}

function clock(){
    // console.log("called clock interval")
    time --;
    // console.log(time);
    if(time <= 0){
        alert("time has run out");
        clearInterval(timerId);
    }
}

function endGame(){
    alert("game has ended");
}

function getQuestion() {
    currentQuestion = questions[currentQuestionIndex];
    questionDisplay.textContent = currentQuestion.question;
    choices.innerHTML = " ";
    currentQuestion.forEach(function (choice, i) {
        var choiceN = document.createElement("button");
        choiceN.setAttribute("class", "choice");
        choiceN.setAttribute("value", choice);
        choiceN.textContent = I + 1 + ". " + choice;
        choiceN.onclick = questionClick;
        choices.appendChild(choiceN);
    });
}


//question click
//function to end an reset game
//stop timer
//save and end score
//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};



function getNewQuestion (){
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerHTML = currentQuestion["choice" + number];
    });
    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});


incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random() * 100),
        name: username.value
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
};



//##############################
//######  Main Flow#############
//##############################

startQuiz