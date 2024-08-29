const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Paris"
    },
    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: "4"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "Jane Austen"],
        correct: "Harper Lee"
    }
];

let currentQuestionIndex = 0;
let score = 0;
const userAnswers = [];

document.addEventListener('DOMContentLoaded', () => {
    showQuestion();
});

function showQuestion() {
    const questionContainer = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const nextBtn = document.getElementById('next-btn');
    
    const currentQuestion = questions[currentQuestionIndex];
    
    questionContainer.textContent = currentQuestion.question;
    
    answersContainer.innerHTML = '';
    currentQuestion.answers.forEach(answer => {
        const answerBtn = document.createElement('div');
        answerBtn.textContent = answer;
        answerBtn.className = 'answer';
        answerBtn.addEventListener('click', () => selectAnswer(answer));
        answersContainer.appendChild(answerBtn);
    });
    
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    });
}

function selectAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correct;
    userAnswers[currentQuestionIndex] = selectedAnswer;

    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => {
        if (answer.textContent === correctAnswer) {
            answer.classList.add('correct');
        } else if (answer.textContent === selectedAnswer) {
            answer.classList.add('incorrect');
        }
    });

    if (selectedAnswer === correctAnswer) {
        score++;
    }
}

function showScore() {
    const quizContainer = document.getElementById('quiz-container');
    const scoreContainer = document.getElementById('score-container');
    
    quizContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    
    document.getElementById('score').textContent = `${score} / ${questions.length}`;
}

document.getElementById('restart-btn').addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers.length = 0;
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('score-container').classList.add('hidden');
    showQuestion();
});

document.getElementById('review-btn').addEventListener('click', () => {
    showReview();
});

function showReview() {
    const reviewContainer = document.getElementById('review-container');
    const quizContainer = document.getElementById('quiz-container');
    
    quizContainer.classList.add('hidden');
    reviewContainer.classList.remove('hidden');
    
    const reviewAnswers = document.getElementById('review-answers');
    reviewAnswers.innerHTML = '';
    
    questions.forEach((question, index) => {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review-item';
        
        const questionText = document.createElement('p');
        questionText.textContent = question.question;
        
        const userAnswer = document.createElement('p');
        userAnswer.textContent = `Your Answer: ${userAnswers[index]}`;
        userAnswer.className = userAnswers[index] === question.correct ? 'correct' : 'incorrect';
        
        const correctAnswer = document.createElement('p');
        correctAnswer.textContent = `Correct Answer: ${question.correct}`;
        correctAnswer.className = 'correct';
        
        reviewDiv.appendChild(questionText);
        reviewDiv.appendChild(userAnswer);
        reviewDiv.appendChild(correctAnswer);
        
        reviewAnswers.appendChild(reviewDiv);
    });
}

document.getElementById('back-btn').addEventListener('click', () => {
    const reviewContainer = document.getElementById('review-container');
    const quizContainer = document.getElementById('quiz-container');
    
    reviewContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
});
