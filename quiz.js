var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var qImg = document.getElementById("qImg");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");


let questions = [
    {
        question: "What does HTML stand for?",
        choiceA: "Hypertex Markup Language",
        choiceB: "Hopefully the Magic Language",
        choiceC: "Higher Than My Language",
        correct: "A"
    }, {
        question: "What does CSS stand for?",
        choiceA: "Calculating Setup Style",
        choiceB: "Cascading Style Sheets",
        choiceC: "Cool Styles",
        correct: "B"
    }, {
        question: "What does JS stand for?",
        choiceA: "Justscript",
        choiceB: "Java",
        choiceC: "Javascript",
        correct: "C"
    }
];

var lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
var questionTime = 10;
var gaugeWidth = 150;
var gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    answerA.innerHTML = q.answerA;
    answerB.innerHTML = q.answerB;
    answerC.innerHTML = q.answerC;
}

start.addEventListener("click", startQuiz);

function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000 = 1s
}

function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;

        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {

            clearInterval(TIMER);
            scoreRender();
        }
    }
}


function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        score++;
        answerIsCorrect();
    } else {

        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender() {
    scoreDiv.style.display = "block";

    const scorePerCent = Math.round(100 * score / questions.length);

    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}
