const question = [
    {
        question: "What is the capital of France?",
        answers: [
            { Text: "Paris", correct: true },
            { Text: "India", correct: false },
            { Text: "Japan", correct: false },
            { Text: "Italy", correct: false },
        ]
    },
    {
        question: "Which country is famous for pizza and pasta?",
        answers: [
            { Text: "Paris", correct: false },
            { Text: "India", correct: false },
            { Text: "Japan", correct: false },
            { Text: "Italy", correct: true },
        ]
    },
    {
        question: "Which country has the Great Wall?",
        answers: [
            { Text: "Paris", correct: false },
            { Text: "India", correct: false },
            { Text: "Japan", correct: false },
            { Text: "China", correct: true },
        ]
    },
    {
        question: "Which country is Known for the Eiffel Tower?",
        answers: [
            { Text: "Paris", correct: false },
            { Text: "France", correct: true },
            { Text: "Japan", correct: false },
            { Text: "China", correct: false },
        ]
    }
];

const questionElement = document.getElementById("Question");
const answerbutton = document.getElementById("answer-buttons");
const Nextbutton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    Nextbutton.innerHTML = "Next";
    Nextbutton.style.display = "none";
    console.log("hello");
    showQuestion();
    console.log("hello 1");
}

function showQuestion() {
    clearInterval(timer); // stop any previous timer
    resetState();
    timeLeft = 10;
    updateTimer();
    timer = setInterval(countdown, 1000);

    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    console.log("hello 2");

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    console.log("hello 3");
}

function resetState() {
    answerbutton.innerHTML = "";
    Nextbutton.style.display = "none";
    timerElement.innerText = `Time Left: 10s`;
}

function countdown() {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
        clearInterval(timer);
        showCorrectAndDisable();
    }
}

function updateTimer() {
    timerElement.innerText = `Time Left: ${timeLeft}s`;
}

function selectAnswer(e) {
    clearInterval(timer);
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if (iscorrect) {
        selectedbtn.classList.add("correct");
        score++;
    } else {
        selectedbtn.classList.add("incorrect");
    }

    showCorrectAndDisable();
}

function showCorrectAndDisable() {
    Array.from(answerbutton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    Nextbutton.style.display = "block";
}

function showScore() {
    clearInterval(timer);
    questionElement.innerHTML = `Your Score: ${score} out of ${question.length}`;
    answerbutton.innerHTML = "";
    timerElement.innerText = "";
    Nextbutton.innerHTML = "Play Again";
    Nextbutton.style.display = "block";
    //Nextbutton.onclick = startQuiz;
    console.log("hello 4");
}

function handleNextbutton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        showScore();
    }
}

Nextbutton.addEventListener("click", () => {
    if (Nextbutton.innerHTML === "Play Again") {
        startQuiz();
    } else {
        handleNextbutton();
    }
});

startQuiz();    