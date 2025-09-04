const questions = [
    {
        question: "Which animal is known as the 'Ship of the Desert?",
        answers: [
            { text: 'Shark', correct: false },
            { text: 'Camel', correct: true },
            { text: 'Ostrich', correct: false },
            { text: 'Horse', correct: false },
        ]
    },
    {
        question: 'How many letters are there in the English alphabet?',
        answers: [
            { text: '26 alphabets', correct: true },
            { text: '24 alphabets', correct: false },
            { text: '21 alphabets', correct: false },
            { text: '28 alphabets', correct: false }
        ]
    },
    {
        question: 'Rainbow consists of how many colors?',
        answers: [
            { text: '6 colors', correct: false },
            { text: '10 colors', correct: false },
            { text: '7 colors', correct: true },
            { text: '8 colors', correct: false }
        ]
    },
    {
        question: 'Name the National animal of India?',
        answers: [
            { text: 'Tiger', correct: true },
            { text: 'Lion', correct: false },
            { text: 'Deer', correct: false }, // Fixed typo: "Dear" to "Deer"
            { text: 'Elephant', correct: false }
        ]
    }
];

const questionElement = document.getElementById('questions');
const ansBtnElement = document.getElementById('ans-btn');
const nextBtn = document.getElementById('next');
const imgTrophy = document.querySelector('.img-trophy');
const scores = document.getElementById('scores');
const quiz=document.querySelector('.quiz');
const scoreId=document.getElementById('scoreId');



let CurrentIndexScore = 0;
let score = 0;

function startQuiz() {
    CurrentIndexScore = 0;
    score = 0;
    nextBtn.innerHTML = 'Next';
    nextBtn.style.display = 'block';
    showQuestion();
}

function showQuestion() {
    resetState();
    let CurrentQuestion = questions[CurrentIndexScore];
    let questNo = CurrentIndexScore + 1;
    questionElement.innerHTML = questNo + '. ' + CurrentQuestion.question;
    nextBtn.style.display = 'block';
    CurrentQuestion.answers.forEach(answers => {
        const button = document.createElement('button');
        button.innerHTML = answers.text;
        button.classList.add('btn');
        ansBtnElement.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = 'true'; // Ensure it's a string

        }
        button.addEventListener('click', selectAns);
    });
    nextBtn.style.display = 'block';
}

function resetState() {

    while (ansBtnElement.firstChild) {
        ansBtnElement.removeChild(ansBtnElement.firstChild);
    }
}

function selectAns(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true'; // Compare as string

    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }

    Array.from(ansBtnElement.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });


    nextBtn.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.style.display = 'none';
    nextBtn.style.display = 'none';

    scores.innerHTML = `You scored ${score} out of ${questions.length}`;
    scores.style.marginBottom = "141px";
    scoreId.style.marginBottom="50px";
    scoreId.style.marginTop="222px";
   // scores.style.display = 'block';

    if (imgTrophy) {
        imgTrophy.style.display = 'block';

    }
    nextBtn.innerHTML = 'Play again';

}

function handleNxtbtn() {
    CurrentIndexScore++;
    if (CurrentIndexScore < questions.length) {
        showQuestion();

    } else {
        showScore();
    }
}

nextBtn.addEventListener('click', () => {
    if (CurrentIndexScore < questions.length) {
        handleNxtbtn();
    } else {
        startQuiz();
    }
})

startQuiz();
