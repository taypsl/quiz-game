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

console.log(state.pageCounter);
// functions that modify state
var increasePageCounter = function(state, pageCounter) {
	state.pageCounter += 1;
};

var addUserChoice = function(state, pageCounter) {
	var choice = $('this').val();
	state.userChoice[pageCounter].push(choice);
};

var displayNextQuestion = function(state, pageCounter, allQuestions) {
	var questionHtml = $('.question');
	var questionText = allQuestions[state.pageCounter].question;
	questionHtml.append(questionText);
	// $('.question').append(allQuestions[state.pageCounter].question);

	var choicesHtml = $('.button-label');
	var choicesText = allQuestions[state.pageCounter].choices;
	choicesHtml.append(choicesText);
	// $('.button-label');
};


var checkAnswer = function(userChoice, correctAnswer, pageCounter) {
	if (userChoices[state.pageCounter] === allQuestions[state.pageCounter].choices[correctAnswer]) { 
		$(this).addClass('right-answer');
		state.numberCorrect +=1; 
	} 
	else {
		$(this).addClass('wrong-answer');
		allQuestions[state.pageCounter].choices[correctAnswer];
		$('button-label').find(correctAnswer[state.pageCounter]).addClass('right-answer');
	}
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

// event handlers

$('.start-quiz').click(function(e) {
	displayNextQuestion(state, pageCounter);
	$('.quiz-page').toggleClass('hidden');
});

$('.answer-choice').on('click', '.button-label', function(e) {
	addUserChoice(state, pageCounter);
	checkAnswer(state, userChoice, correctAnswer, pageCounter);
}) 


$('#next').click(function(event) {
	e.preventDefault();
	increasePageCounter(state, pageCounter);
	displayNextQuestion(state, pageCounter);
	$('.page-number').text('state.pageCounter' + '/10')
	if (state.pageCounter === 10) {
		$('.quiz-page').toggleClass('hidden'); //might have to be specific about page add/remove to hide next and unhide try again
		$('h1').text(quizScore);
		$('.score').text(resultsText);
		$('.page-number').addClass('hidden');
	}
})





}); 



