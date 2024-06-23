var randomNum1 = Math.floor(Math.random()*11);
var randomNum2 = Math.floor(Math.random()*11);
var randomNum3 = Math.floor(Math.random()*11);
var randomNum4 = Math.floor(Math.random()*11);
var randomNum5 = Math.floor(Math.random()*11);

var res = randomNum1 + randomNum2;
const questions = [
    {
        question: "What is the capital of Bangladesh?",
        answers: [
            {text: "Dhaka", cor: true},
            {text: "Bagura", cor: false},
            {text: "Khulna", cor: false},
            {text: "Sylhet", cor: false},
        ]
    },

    {   
        question: "What is the color of water?",
        answers: [
            {text: "Sky Blue", cor: false},
            {text: "Pink", cor: false},
            {text: "Green", cor: false},
            {text: "None of the above", cor: true},
        ]
    },

   {
    question: "Who killed Erwin in AOT?",
    answers: [
        {text: "Cart Titan", cor: false},
        {text: "Jaw Titan", cor: false},
        {text: "Beast Titan", cor: true},
        {text: "None of the above", cor: false},
    ]
   }, 

   {
    question: `What is ${randomNum1} + ${randomNum2}?`,
    answers: [
        {text: `${randomNum1}`, cor: false},
        {text: `${randomNum4}`, cor: false},
        {text: `${res}`, cor: true},
        {text: `12`, cor: false},
    ]
   },

   {
    question: `What is love?`,
    answers: [
        {text: `I don't know`, cor: false},
        {text: `Baby don't hurt me`, cor: true},
        {text: `I don't care about love.`, cor: false},
        {text: `Him`, cor: false},
    ]
   }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.cor){
            button.dataset.correct = answer.cor;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you got ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();