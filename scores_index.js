var highScoresList = document.getElementById("highScoresList");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
    .map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })

    .join("");

var clear = document.getElementById("remove")

clear.addEventListener("click", function(event) {
    event.preventDefault()
    var areYouSure = confirm("Cleared scores cannot be retrieved. Once you clear these highscores, you'll be brought back to the home page of the quiz. Are you sure you want to clear?")

    if (confirm) {
        localStorage.removeItem("highScores")
        window.location.href = "https://kyliemegan24.github.io/MandMs_PopQuiz/"
    }

})

