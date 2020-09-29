var startBtn = document.getElementById('start-btn')
var questionContainerEl= document.getElementById('question-container')
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-buttons')
var timeEl = document.getElementById('timer')

var timeRemaining = 60
var questionIndex



startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    startBtn.classList.add('hide');
    questionIndex = 0;
    questionContainerEl.classList.remove('hide');
    startTime();
    nextQuestion();
    
}

function nextQuestion() {
    resetAnswers();
    showQuestion(questions[questionIndex]);
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct
        }

        button.addEventListener('click', chooseAnswer);
        answerButtonsEl.appendChild(button)

    })

}

function resetAnswers() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }

}


function chooseAnswer(e) {
    var chosenAnswer = e.target;
    var correct = chosenAnswer.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    
    })

    if (!correct) {
        timeRemaining = timeRemaining - 5;
    }

    if (questions.length >= questionIndex + 1) {
  
            questionIndex++
            nextQuestion()

    }

    else {
        endQuiz()
    }

   

}

function setStatusClass(element, correct) {
    clearStatusClass(element)

    if (correct) {
        element.classList.add("correct")
    }
    else {
        element.classList.add("incorrect")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("incorrect")
}


function startTime() {
    var timerInterval = setInterval(function() {
        timeRemaining--;
        timeEl.textContent = "Time: " + timeRemaining;

        if (timeRemaining === 0 || questions.length <= questionIndex) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000 )
}


function endQuiz() {
    questionContainerEl.classList.add("hide");

    var finishDiv = document.createElement("div");
    finishDiv.textContent = "Finished!";
    main.appendChild(finishDiv);
    finishDiv.setAttribute("style", "text-align:center; font-weight:bold; padding:10px; margin:5px;")

    var scoreDiv = document.createElement("div");
    scoreDiv.textContent = "You scored: " + timeRemaining ;
    finishDiv.appendChild(scoreDiv);

    var directions = document.createElement("div")
    directions.textContent = "Enter your name here!"
    finishDiv.appendChild(directions)

    var scoreNameBox = document.createElement("input")
    finishDiv.appendChild(scoreNameBox)

    var submitButton = document.createElement("btn")
    submitButton.textContent = "Submit"
    finishDiv.appendChild(submitButton)
    submitButton.setAttribute("style", "background-color:purple; color:white; border:1px solid; border-color:pink; border-radius:5px; font-size:1rem; padding:3px; margin:20px; gap:10px;")

    submitButton.addEventListener("click", function(event) {
       event.preventDefault();

        var highScores = JSON.parse(localStorage.getItem("highScores")) || []

        var score = {
            score: timeRemaining,
            name: scoreNameBox.value
        }

        highScores.push(score)
        highScores.sort( (a,b) => b.score - a.score)

        localStorage.setItem("highScores", JSON.stringify(highScores))

        if (score === "") {
            alert("Please put in your name!")
        }

        else {
            alert("Thanks for playing!")
            window.location.href = "scores_index.html"
        }

    })

    clearInterval(timerInterval)
}


var questions = [
    {
      question: 'How many colors are in plain M&Ms packages today?',
      answers: [
        { text: '6', correct: true },
        { text: '5', correct: false },
        { text: '10', correct: false},
        { text: '7', correct: false}
      ]
    },
    {
      question: 'What year were M&Ms introduced?',
      answers: [
        { text: '1941', correct: true },
        { text: '1972', correct: false },
        { text: '1955', correct: false },
        { text: '1963', correct: false }
      ]
    },
    {
      question: 'Which of these has never been an availble M&M flavor?',
      answers: [
        { text: 'Thai Coconut', correct: false },
        { text: 'Pumpkin Spice Latte', correct: false },
        { text: 'Lemon Meringue', correct: true },
        { text: 'Wild Cherry', correct: false }
      ]
    },
    {
      question: 'What is the M&M company slogan?',
      answers: [
        { text: 'More and more.', correct: false },
        { text: 'Chocolately. Colorful. Candy.', correct: false },
        { text: 'Taste the Rainbow.', correct: false },
        { text: 'Melts in your mouth, not in your hand.', correct: true }
      ]
    },
  
  
    {
      question: 'The Blue M&M character is a mascot of which falvor?',
      answers: [
        { text: 'Peanut', correct: false },
        { text: 'Peanutbutter', correct: false },
        { text: 'Almond', correct: true },
        { text: 'Caramel', correct: false }
      ]
    }
  ]

