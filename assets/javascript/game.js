//objects
var qA = {
			1:{
				question:'From what planet does the Doctor come?',
				answers:['Pluto','Gallifrey','P9xK23','The Sun'],
				correct:'Gallifrey',
				right: 'Correct!',
				wrong: 'Wrong!',
				imageUrl: src='https://media.giphy.com/media/bynpaLJn6LfVK/giphy.gif'
			   },
			2:{
				question:'What is the Tardis',
				answers:['Police Box','Dog"s name','Time Space Thing','A What'],
				correct:'Police Box',
				right: 'Correct!',
				wrong: 'Wrong!',
				imageUrl: src='https://media.giphy.com/media/pbcDD97P5RYDm/giphy.gif'
			},
			3:{
				question:'Who is The Doctors worsest enemy?',
				answers:['Dairy','The Master','Ice Men','Robots'],
				correct:'The Master',
				right: 'Correct!',
				wrong: 'Wrong!',
				imageUrl: src='https://media.giphy.com/media/3o72FhxujRMcOqUm8o/giphy.gif'
			},
			4:{
				question:'Who is the hottest companion?',
				answers:['Amy Pond','Rose Tyler','Clara Oswald','Lucie Miller'],
				correct:'Clara Oswald',
				right: 'Correct!',
				wrong: 'Wrong!',
				imageUrl: src='https://media.giphy.com/media/BtzQd0kbjfBFC/giphy.gif'
			}

	};

//Variables
var trivTime = 0;
var rightCount = 0;
var wrongCount = 0;
var qACount = 1;
var timer = '';
var intervalId;

//Functions
var start = function(){
	$('.startBtn').on('click',function(){
		//Emptys trivia section
		$('.qaArea').empty();
		createQuestions();
	});
}
var createQuestions = function(){
	timerStart();
	var question = qA[qACount]['question'];
	var newDiv = $('<div>');
	newDiv.addClass('question');
	newDiv.text(question);
	$('.qaArea').append(newDiv);
	createAnswers();
}
var createAnswers = function(){
	var answerLength = qA[qACount]['answers'].length;
	for(var i = 0; i < answerLength;i++){
		var answers = qA[qACount]['answers'][i];
		var newBtn = $('<button>');
		newBtn.addClass('answers redBtn');
		newBtn.attr('data-type',answers);
		newBtn.text(answers);
		$('.qaArea').append(newBtn);
	}
	//Prevents click event from being saved
	$(document).off('click','.answers',checkAnswer);
	$(document).on('click','.answers',checkAnswer);
}
var checkAnswer = function(){
	var userAnswer = $(this).data('type');
	var correctAnswer = qA[qACount]['correct'];
	var correctImg = qA[qACount]['imageUrl'];

	var right = qA[qACount]['right'];
	var wrong = qA[qACount]['wrong'];
	console.log(qACount);
	if(userAnswer === correctAnswer){
		rightCount++;
		$('.qaArea').empty();
		var newImg = $('<img>');
		newImg.attr('src',correctImg);
		$('.qaArea').append(newImg);
		var newDiv = $('<div>');
		newDiv.addClass('rightAnswer');
		newDiv.text(right);
		$('.qaArea').append(newDiv);
		clearInterval(timer)
		qACount++;
		if(qACount <= 4){
			setTimeout(
				function(){
					$('.qaArea').empty();
					createQuestions();
					},3500);
		}
		else{
			$('.qaArea').empty();
			var newImg = $('<img>');
			newImg.attr('src',correctImg);
			$('.qaArea').append(newImg);
			var newDiv = $('<div>');
			newDiv.addClass('rightAnswer');
			newDiv.text(right);
			$('.qaArea').append(newDiv);
			clearInterval(timer)
			setTimeout(gameOver, 3500);
		}
	}
	else{
		wrongCount++;
		$('.qaArea').empty();
		var newImg = $('<img>');
		newImg.attr('src',correctImg);
		$('.qaArea').append(newImg);
		var newDiv = $('<div>');
		newDiv.addClass('wrongAnswer');
		newDiv.text(wrong);
		$('.qaArea').append(newDiv);
		clearInterval(timer)
		qACount++;
		
		if(qACount <= 4){
			setTimeout(function(){
			$('.qaArea').empty();
			createQuestions();
			},3500);
		}
		else{
			$('.qaArea').empty();
			var newImg = $('<img>');
		newImg.attr('src',correctImg);
		$('.qaArea').append(newImg);
			var newDiv = $('<div>');
			newDiv.addClass('wrongAnswer');
			newDiv.text(wrong);
			$('.qaArea').append(newDiv);
			clearInterval(timer);
			setTimeout(gameOver, 3500);
		}
	}
}
//Timer
// can't display timer progress on HTML but timer works at 50 seconds of time. I think I fucked up the code lol.
var timerStart = function(){ 
	$('.timerSection').empty();
	trivTime = 50;
	var timeTag = $('<div>');
	timeTag.addClass('time');
	timeTag.addClass('progress');
	var progressBar = $('<div>');
	progressBar.addClass('myBar');
	progressBar.width(trivTime + '%');

	$('.timerSection').append(timeTag);
	$('.time').append(progressBar);	
	timer = setInterval(timeDecrement,100);
}
var timeDecrement = function(){ 
	$('.myBar').width(trivTime + '%');
	trivTime--;
	if(trivTime === -10){
		userAnswer = false;
		clearInterval(timer);
		checkAnswer();

	}
	console.log(trivTime);
}
var gameOver = function(){
	$('.qaArea').empty();
	$('.timerSection').empty();
	var scoreDiv = $('<div>');
	scoreDiv.addClass('score');
	scoreDiv.html('Correct: ' + rightCount + '<br>' + 'Wrong: ' + wrongCount);
	$('.qaArea').append(scoreDiv);
	var newDiv = $('<div>');
	newDiv.addClass('gameOver');
	newDiv.text('Game Over! Play Again ?');
	$('.qaArea').append(newDiv);
	var newBtn = $('<button>');
	newBtn.addClass('redBtn resetBtn');
	newBtn.text('Reset');
	$('.qaArea').append(newBtn);
	trivTime = 100;
	qACount = 1;
	rightCount = 0;
	wrongCount = 0;
	$('.resetBtn').on('click',function(){
		$('.qaArea').empty()
		createQuestions();
	});
}
start();
