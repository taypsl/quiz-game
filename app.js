$(document).ready(function() {

// state
var state = {
		userChoices: [], 
		pageCounter: 0,	
		numberCorrect: 0,
}

var allQuestions = [{
		question: "What is Albus Dumbledore's full name?", 
		choices: ["Albus Aberforth Percival Brian Dumbledore", "Albus Percival Wulfric Brian Dumbledore", "Albus Peveral Wulfric Brian Dumbledore", "Albus Percival Wilfred Dumbledore"], 
		correctAnswer:1
	}, {
		question: "What is the name of the ice cream shop in Diagon Alley?",
		choices: ["Madam Malkins", "Florence Fountaineaus", "Bergen and Borks", "Florean Fortescues"], 
		correctAnswer:3
	}, {
		question: "Where do Harry and Cho have their first date?", 
		choices: ["The Yule Ball", "The Three Broomsticks", "The Room of Requirement", "Mrs. Puddlemeir's"], 
		correctAnswer:3
	}, {
		question: "When Harry asks Dumbledore what he sees when he looks into the Mirror of Erised, what does Dumbledore tell him he sees?", 
		choices: ["getting a pair of socks", "his family back with him", "Voldemort defeated", "himself as Minister of Magic"], 
		correctAnswer:0
	}, {
		question: "In Harry Potter and the Goblet of Fire, what is the name of the Muggle family that managed the campsite at the Quidditch World Cup?", 
		choices: ["Davies", "Williams", "Rogers", "Smith"], 
		correctAnswer:2
	}, {
		question: "What position did Regulus Black play on the Slytherin Quidditch team?", 
		choices: ["Seeker", "Keeper", "Beater", "Chaser"], 
		correctAnswer:0
	}, {
		question: "Which magical creature carries away Dolores Umbridge at the end of Harry Potter and the Order of the Phoenix?", 
		choices: ["A Giant", "A herd of Centaurs", "An acromantula", "A werewolf"], 
		correctAnswer:1
	}, {
		question: "Who was the first student petrified by the Basilisk?", 
		choices: ["Hannah Abbot", "Ernie McMillen", "Penelope Clearwater", "Justin Finch-Fletchley"], 
		correctAnswer:3
	}, {
		question: "Which of the following creatures <u>doesn't</u> Harry encounter in the Forbidden Forest?", 
		choices: ["Centaurs", "Thestrals", "Red Capps", "Unicorns"], 
		correctAnswer:2
	}, {
		question: "What failed spell does Professor Lockheart use to rid his classroom of Pixies?", 
		choices: ["Pixie Pesky Problemo", "Pesky Pixie Pestronomy", "Peskinium Pixie", "Pix Pix Peskinium"], 
		correctAnswer:1
	}];

var results = [{
		score: 25, 
		output: "Not to worry, not to worry, there's still time to prepare before December 17th."
	}, {
		score: 50, 
		output: "Not half bad. You'll be a great wizard, once you've been trained up a bit."
	}, {
		score: 75, 
		output: "Jumpin' Gargoyles, that score is not too shabby!"
	}, {
		score: 100, 
		output: "Merlin's pants! With scores like that you could give Hermione Granger a run."
	}];

// game logic 
var increasePageCounter = function(state) {
	state.pageCounter++;
};

var addUserChoice = function(state, choice) {
  state.userChoices[state.pageCounter] = choice;
};

var quizScore = function(state, userChoice, pageCounter, correctAnswer) {
	var finalScore = (numberCorrect / 10) * 100;
};
	
var resultsText = function(quizScore) {
	if (quizScore <= 25) {
		results[0].output //add listener later? append to page later? 
	}
	else if (quizScore > 25 && finalScore <=50) {
		results[1].output;
	}
	else if (quizScore > 50 && finalScore <=75) {
		results[2].output;
	}
	else {
		results[3].output;
	}
};
// functions that display to screen
var displayNextQuestion = function(state, pageCounter, allQuestions) {
	var questionHtml = $('.question');
	var questionText = allQuestions[pageCounter].question;
	questionHtml.text(questionText);

	var choices = allQuestions[state.pageCounter].choices;
    for (var i=0; i<choices.length; i++) {
      $('.button-label#' + i).text(choices[i]);
    }
};

var checkAnswer = function(state) {
	if (state.userChoices[state.pageCounter] == allQuestions[state.pageCounter].correctAnswer) { 
		$('.button-label#' + allQuestions[state.pageCounter].correctAnswer).closest('button').css('border', '3px solid green');
		state.numberCorrect++; 
		console.log('right');
	} 
	else {
		$(this).closest('button').css('border', '3px solid green');
		$('.button-label#' + allQuestions[state.pageCounter].correctAnswer).closest('button').css('border', '3px solid green');
  		console.log('wrong');
  }
  $('#next').toggleClass('hidden');
};



// event handlers
$('.start-quiz').click(function(e) {
	displayNextQuestion(state, 0, allQuestions);
	$('.quiz-page').removeClass('hidden');
	$('.answer-choice').removeClass('hidden');
	$('.intro').addClass('hidden');
});

$('.answer-choice').one('click', '.button-label', function(e) {
	var choice = $(this).attr('id');
  	addUserChoice(state, choice);
	checkAnswer(state);
	$(".answer-choice[type=submit]").attr('disabled','disabled');
});

$('#next').click(function(e) {
	e.preventDefault();
	increasePageCounter(state);
	displayNextQuestion(state, pageCounter, allQuestions);
	$('#next').toggleClass('hidden');
	$('.page-number').text('state.pageCounter' + '/10')
	if (state.pageCounter === 10) {
		$('.quiz-page>.answer-choice.hidden').addClass('hidden');
		$('.results').removeClass('hidden');
		$('h1').text(quizScore);
		$('.score').text(resultsText);
		$('.page-number').addClass('hidden');
	}
});





}); 



