$(document).ready(function() {
	
	// State
	var state = {
		userChoices: [], 
		pageCount: 0,	
		numberCorrect: 0,
	}
	
	var allQuestions = [{
		question: "What is Albus Dumbledore's full name?", 
		choices: ["Albus Aberforth Percival Brian Dumbledore", "Albus Percival Wulfric Brian Dumbledore", "Albus Peveral Wulfric Brian Dumbledore", "Albus Percival Wilfred Dumbledore"], 
		correctAnswer:1
	}, {
		question: "What is the name of the ice cream shop in Diagon Alley?",
		choices: ["Madam Malkin's", "Florence Fountaineaus", "Borgin and Burkes", "Florean Fortescue's"], 
		correctAnswer:3
	}, {
		question: "Where do Harry and Cho have their first date?", 
		choices: ["The Yule Ball", "The Three Broomsticks", "The Room of Requirement", "Madam Puddifoot's"], 
		correctAnswer:3
	}, {
		question: "When Harry asks Dumbledore what he sees in the Mirror of Erised, what does Dumbledore tell him he sees?", 
		choices: ["getting a pair of socks", "his family back with him", "Voldemort defeated", "himself as Minister of Magic"], 
		correctAnswer:0
	}, {
		question: "In 'Harry Potter and the Goblet of Fire', what was the name of the Muggle family that managed the campsite at the Quidditch World Cup?", 
		choices: ["Davies", "Williams", "Roberts", "Smith"], 
		correctAnswer:2
	}, {
		question: "What position did Regulus Black play on the Slytherin Quidditch team?", 
		choices: ["Seeker", "Keeper", "Beater", "Chaser"], 
		correctAnswer:0
	}, {
		question: "Which magical creatures carry away Dolores Umbridge at the end of 'Harry Potter and the Order of the Phoenix?'", 
		choices: ["Giants", "A herd of Centaurs", "An nest of Acromantula", "A swarm of Dementors"], 
		correctAnswer:1
	}, {
		question: "Who was the first student petrified by the Basilisk?", 
		choices: ["Penelope Clearwater", "Ernie McMillen", "Justin Finch-Fletchley", "Colin Creevey"], 
		correctAnswer:3
	}, {
		question: "Which of the following creatures doesn't Harry encounter in the Forbidden Forest?", 
		choices: ["Centaurs", "Thestrals", "Hinkypunks", "Unicorns"], 
		correctAnswer:2
	}, {
		question: "What failed spell does Professor Lockheart use to rid his classroom of Pixies?", 
		choices: ["Pixiepesky Problemo", "Peskipiksi Pesternomi", "Peskinium Pixie", "Pixpix Peskinium"], 
		correctAnswer:1
	}];
	
	var results = [
    "Not to worry, not to worry, there's still time to prepare before December 17th.",
	  "Not half bad. You'll be a great wizard, once you've been trained up a bit.",
	  "Jumpin' Gargoyles, that score is not too shabby!",
	  "Merlin's pants! With scores like that you could give Hermione Granger a run."
  ];
	
  
	// game logic 
	var increasePageCount = function(state) {
		state.pageCount++;
	};
	
	var addUserChoice = function(state, choice) {
		state.userChoices[state.pageCount] = choice;
	};
	
	var quizScore = function(state) {
		var finalScore = (state.numberCorrect / 10) * 100;
		return finalScore;
	};
	
	var resultsText = function(state) {
		var resultsIndex = Math.floor(quizScore(state)/25);
		return results[resultsIndex];
	};
	
	var checkAnswer = function(state) {
		if (state.userChoices[state.pageCount] == allQuestions[state.pageCount].correctAnswer) { 
			state.numberCorrect++; 
			return true
		} 
		return false;
	}
	
	var restartState = function(){
		state.pageCount = 0;
		state.userChoices = [];
		state.numberCorrect = 0;
		displayNextQuestion(state, allQuestions);
	}
	
  
	// Functions that display to screen
	var displayNextQuestion = function(state, allQuestions) {
		$('.question').text(allQuestions[state.pageCount].question); //display question
		var choices = allQuestions[state.pageCount].choices;		 //display answer choices
		
    for (var i=0; i<choices.length; i++) {
			$('.answer-choice#' + i).find('span').text(choices[i]);
		}
		
		$('.page-number').text('Page ' + (state.pageCount + 1) + '/10')
		$('.answer-choice[type=submit').prop('disabled', false); //re-enable button
		$('.answer-choice').removeClass('wrong-answer');		
		$('.answer-choice').removeClass('right-answer');		
		$('#next').addClass('hidden');
	};
	
	var showCorrectAnswer = function(state) {
		$('.answer-choice#' + allQuestions[state.pageCount].correctAnswer).addClass('right-answer');
		if (!checkAnswer(state)){
			$('.answer-choice#' + state.userChoices[state.pageCount]).addClass('wrong-answer');
		}
		$('#next').removeClass('hidden');
	};
	 
	
	// Event handlers
	$('.start-quiz').click(function(e) {
		restartState();
		$('.quiz-page').removeClass('hidden');
		$('.answer-choice').removeClass('hidden');
		$('.intro').addClass('hidden');
		$('.start-quiz').addClass('hidden');
		$('.results').addClass('hidden');
		$('.page-number').removeClass('hidden');
	});
	
	$('.answer-choice').on('click', function(e) {
		var choice = $(this).attr('id');
		addUserChoice(state, choice);
		showCorrectAnswer(state);
		$('.answer-choice[type=submit]').prop('disabled', true); //disable button
	});
	
	$('#next').click(function(e) {
		e.preventDefault();
    
		if (state.pageCount < (allQuestions.length-1)) {
			increasePageCount(state);
			displayNextQuestion(state, allQuestions);
		}else{
			$('h1').text(quizScore(state)+'%');
			$('.score').text(resultsText(state));
			$('.quiz-page').addClass('hidden');
			$('.results').removeClass('hidden');
			$('.start-quiz').removeClass('hidden');
			$('.page-number').addClass('hidden');
		}    
	});
});