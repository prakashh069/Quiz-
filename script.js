// Array of quiz questions with corresponding answers
const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ],
    },
    {
        question: "Which one of the following rivers flows between Vindhyan and Satpura ranges?",
        answers: [
            { text: "Narmada", correct: true },
            { text: "Narmadai", correct: false },
            { text: "Son", correct: false },
            { text: "Netravati", correct: false },
        ],
    },
    {
        question: "The Central Rice Research Station is situated in?",
        answers: [
            { text: "Chennai", correct: false },
            { text: "Cuttack", correct: true },
            { text: "Bangalore", correct: false },
            { text: "Quilon", correct: false },
        ],
    },
    {
        question: "Who among the following wrote Sanskrit grammar?",
        answers: [
            { text: "Kalidasa", correct: false },
            { text: "Charak", correct: false },
            { text: "Panini", correct: true },
            { text: "Aryabhatt", correct: false },
        ],
    },
];

// Elements from the HTML
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Variables to keep track of the current question index and user's score
let currentQuestionIndex = 0;
let score = 0;

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Function to display a question and its answer choices
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Create buttons for each answer choice
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// Function to reset the state (clear buttons and hide next button)
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function to handle the user's answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");

        // Find and highlight the correct answer
        const correctBtn = Array.from(answerButtons.children).find(btn => btn.dataset.correct === "true");
        if (correctBtn) {
            correctBtn.classList.add("correct");
        }
    }

    // Disable buttons and show the next button
    disableButtons();
    nextButton.style.display = "block";
}

// Function to disable all answer buttons
function disableButtons() {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.disabled = true;
    });
}

// Function to display the final score after completing all questions
function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "PLAY AGAIN";
    nextButton.style.display = "block";
}

// Function to handle the "Next" button click
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Event listener for the "Next" button click
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// Start the quiz initially
startQuiz();
