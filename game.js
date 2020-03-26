var questions = document.getElementById("question");
var choices = document.getElementsByClassName("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var timer1 = ('time');
var feedback1 = document.getElementById("feedback");
var initials = document.getElementById("initials");

var timerId;
var time = (questions.length) * 15;
var currentQuestionIndex = 0;

/////////////////////////////////

function startQuiz() {
    var startScreen = document.getElementById("start-screen")
    startScreen.setAttribute("class", "hide");

    questions.removeAttribute("class");

    timerId = setInterval(clockTick, 1000);

    timer1.textContent = time;

    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    var title1 = document.getElementById("question-title");
    title1.textContent = currentQuestion.title;

    choices.innerHTML = "";

    currentQuestion.choices.forEach(function (choice, i) {
        var choiceN = document.createElement("button");
        choiceN.setAttribute("class", "choice");
        choiceN.setAttribute("value", choice);

        choiceN.textContent = I + 1 + ". " + choice;

        choiceN.onclick = questionClick;

        choices.appendChild(choiceN);
    });
}

function questionClick(){
    if (this.value !== questions[currentQuestionIndex].answer){
    
    time -= 15;
    if (time < 0) {
        time = 0;
    }

    timer1.textContent = time;

    feedback1.textContent = "Wrong!";

    } else {

    feedback1.textContent = "Correct!";
    }

    feedback1.setAttribute("class", "feedback");
    setTimeout(function() {
        feedback1.setAttribute("class", "feedback hide");
    }, 1000);

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length){
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd(){

    clearInterval(timerId);

    var endScreen = document.getElementById("end-screen");
    endScreen.removeAttribute("class");

    var finalScore = document.getElementById("final-score");
    finalScore.textContent = time;

    questions.setAttribute("class", "hide");
}

function clockTick(){
    time--;
    timer1.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}




function saveHighscore() {

    var enteredInitials = initials.value.trim();

    if (enteredInitials !== "") {

        var highscores =
            JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
            score: time,
            initials: enteredInitials
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        window.location.href = "highscores.html";
    }
}
function checkForEnter(event) {

    if (event.key === "Enter") {
        saveHighscore();
    }
}

submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter