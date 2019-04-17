
// we have a start button
// when user pressing start the game is started (on click event)
// 1 div with a question and 3-4 answers showing on a screen + 30 sec timer to unswer that question
// if we press the answer it will show us if it's correct or not (on click event)
// so the div will be changed if we correct/not correct
// when we out of time the game is over and it shows us correct answer.
// at the very end of the game the timer stop, it showing us how many correct and incorrect answers user had+ th button Start Over.

$(document).ready(function() {
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var userGuess = "";
    // var newArray = [];
    var holder = [];
    var timerRunning = false;
  
    var intervalId;
    // var oneOfTheObject;
    var pickedObject;
  
  // creating var object for all questions. Array of objects
  
  var allQuestions = [
    {
      question: "Who plays the role as Holly Golightly in the 1961 American film Breakfast at Tiffany’s?",
      answersArray: [
        "Audrey Hepburn",
        "Katharine Hepburn",
        "Shirley MacLaine",
        "Marilyn Monroe"
      ],
      correctAnswer: 0,
      picture: "./assets/images/audrey.jpg",
    },
  
    {
      question: "Audrey Hepburn stars in which of these films?",
      answersArray: [
        "Irma la Douce",
        "Some Like It Hot",
        "Never on Sunday",
        "The Unforgiven"
      ],
      correctAnswer: 3,
      picture: "./assets/images/unfor.jpg",
    },
  
    {
      question: "House of Usher is based on a story by which author?",
      answersArray: [
        "William Faulkner",
        "Edgar Allan Poe",
        "John Updike",
        "John Cheever"
      ],
      correctAnswer: 1,
      picture: "./assets/images/house.jpg",
    },
  
    {
      question: "What does Jack Lemmon use as a colander in The Apartment?",
      answersArray: [
        "Tennis Racket",
        "Shower Filter",
        "Drying Rack",
        "Watering Can"
      ],
      correctAnswer: 0,
      picture: "./assets/images/apartments.jpg",
    }
  ];
  
  $("#reset").hide();
  
  $("#start").on("click", function() {
    $(this).hide();
    startTimer();
   
    for (var i = 0; i < allQuestions.length; i++) {
      holder.push(allQuestions[i]);
      console.log("This is the holder" + holder);
    }
  
    displayQuestion();
  
  });
  
  // set the timer + flag to provent timer from goes faster than we expecting
  
  function startTimer() {
    if (!timerRunning) {
      intervalId = setInterval(timerCountDown, 1000);
      timerRunning = true;
    }
  }
  
  function timerCountDown() {
    $("#timeleft").html("<h2>Seconds left: " + timer + "</h2>");
    timer--;
  
      if (timer < 0) {
      stopTimer();
      unanswerCount++;       
      $("#questions").html("<h2>You run out of time</h2>");
      forPicture();
      
      }
      
   
  }
  
  function stopTimer() {
    timerRunning = false;
    clearInterval(intervalId);
  }
  
  function displayQuestion() {
   
    pickedObject = holder.pop();
  
    $("#questions").html("<h3>" + pickedObject.question + "</h3>");
  
    for (var i = 0; i < pickedObject.answersArray.length; i++) {
      console.log(pickedObject.answersArray.length);
  
      var eachAnswer = $("<p>");
      eachAnswer.addClass("possibleAnswer");
      eachAnswer.html(pickedObject.answersArray[i]);
      eachAnswer.attr("data-answers", i);
      $("#answerblock").append(eachAnswer);
    }
  }
  
  $("#answerblock").on("click", ".possibleAnswer", function() {
    console.log("click is working");
  
    userGuess = parseInt($(this).attr("data-answers"));
    console.log("this is UserGuess" + userGuess);
  
    if (userGuess === pickedObject.correctAnswer) {
      stopTimer();
      $("#questions").html("<p>Correct!</p>");
      forPicture();
      correctCount++;
    } else {
      stopTimer();
      $("#questions").html("<p>Wrong! The correct answer is: " + pickedObject.answersArray[pickedObject.correctAnswer] +"</p>");
      wrongCount++;
      forPicture();
    }
  });
  

  function forPicture() {
    $("#answerblock").html("<img src=" + pickedObject.picture + ">");
    
  
    setTimeout(function() {
      $("#answerblock").empty();
      timer = 20;
      if ((wrongCount + correctCount + unanswerCount) === allQuestions.length) {
        $("#reset").show();
        $("#questions").empty();
        $("#questions").html("<h3>Game Over!  Here's how you did: </h3>");
        $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
        $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
        $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
        correctCount = 0;
        wrongCount = 0;
        unanswerCount = 0;
      } else {
        startTimer();
        displayQuestion();
      }
    }, 3000);
  }
  
  $("#reset").on("click", function() {
    $("#reset").hide();
    $("#answerblock").empty();
    $("#questions").empty();
    for (var i = 0; i < allQuestions.length; i++) {
      
      holder.push(allQuestions[i]);
      console.log("This is the holder" + holder);
    }
    startTimer();
    displayQuestion();
  });
  });
  