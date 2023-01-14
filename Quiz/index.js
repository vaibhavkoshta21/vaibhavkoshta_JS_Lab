// creating question 
function Quiz(question){
    this.score = 0;
    this.question = question;
    this.questionIndex = 0;

}

Quiz.prototype.getQuestionByIndex = function(){
    return this.question[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function(answer){
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function(){
    return this.questionIndex === this.question.length
}

function Question(text, choices, answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Question.prototype.isCorrectAnswer = function(choice){
    return this.answer === choice;

}
let question = [
    new Question("JavaScript Supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not JavaScript Framework", ["Python Script", "JQuery", "Django", "NodeJS"], "Django"),
    new Question("Which is used to connect to database", ["PHP", "HTML", "JS", "ALL"], "PHP"),
    new Question("JavaScript is a", ["Language", "Programmng Language", "Development", "All"], "Programming Language"),
];



function loadQuestions(){
    if(quiz.isEnded()){
        showScore();
    }else {
        //show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByIndex().text;

        //show options
        var choices = quiz.getQuestionByIndex().choices;
        for(let i=0; i<choices.length; i++){
            var choice = document.getElementById("choice" + i);
            console.log(choices);
            choice.innerHTML = choices[i];
            handleOptionButton("btn"+i,choices[i])
        }

        showProgress();
    }
}

function showProgress(){
    let currentQuestionNumber = quiz.questionIndex + 1;
    let element = document.getElementById("progress");
    element.innerHTML = "Question" + currentQuestionNumber + "of" + quiz.question.length;

}


function showScore(){
    var gameOverHtml = "<h1>Results</h1>";
    gameOverHtml+= "<h2 id='score'> Your Scores: " + quiz.score + ". And Percentage is: " + (quiz.score/question.length*100) + "%" + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
}

function handleOptionButton(id,choice){
    let button = document.getElementById(id);
    button.onclick = function(){
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}
//Creating Quiz
var quiz = new Quiz(question);

//Loading the questions

loadQuestions();
