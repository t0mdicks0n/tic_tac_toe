// The server
var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
var Preferences = require('preferences');
var Spinner     = CLI.Spinner;
var touch       = require('touch');
var fs          = require('fs');

// TD
var ctx 				= require('axel');
var Promise 		= require("bluebird");

// Game logic:
var Game = function() {
	this.currentPlayer = '1';
	this.board = [
		[] , [] , [],

		[] , [] , [],

		[] , [] , [] 
	];
};

Game.prototype.getCurrentPlayer = function() {
	var oldCurrentPlayer = this.currentPlayer;
	if (oldCurrentPlayer === '1') {
		this.currentPlayer = '2';
	} else {
		this.currentPlayer = '1';
	}
	return oldCurrentPlayer;
};

Game.prototype.drawBord = function() {
	ctx.clear();
	var x = 2;
	var y = 2;
	var width = 10;
	var height = 5;
	var widthCount = 0;

	this.board.forEach((el, index, arr) => {
		if (el.length === 0) {
			ctx.bg(0,0,255);
			ctx.box(x, y, 8, 4);
		} else if (el === '1') {
			ctx.bg(255,0,0);
			ctx.box(x, y, 8, 4);
		} else {
			ctx.bg(255,255,0);
			ctx.box(x, y, 8, 4);
		}
		
		if (widthCount <= 3) {
			x += 10;
			// y += 5dw
			widthCount ++;
		} else {
			x = 2;
			y += 5;
		}

	});
};

Game.prototype.getUserInput = function(callback, player) {
	return new Promise(function(resolve, reject) {
		var questions = [
			{
				name: 'chooseMove',
				type: 'input',
				message: 'Hey Player' + player + ', its your turn!, pick a move!',
		    validate: function( value ) {
		      if (value.length) {
		        return true;
		      } else {
		        return 'Please pick a move Player' + player;
		      }
		    }
			},
		];
  	
  	inquirer.prompt(questions)
  	.then(callback)
  	.then(() => {
  		resolve();
  	});
	});
};

clear();

console.log(
  chalk.blue(
    figlet.textSync('Toms Tic Tac Toe', { horizontalLayout: 'full' })
  )
);

function drawBord() {
	ctx.clear();

	ctx.bg(0,0,255);
	ctx.box(2,2,8,4);
	 
	ctx.bg(0,0,255);	
	ctx.box(12,2,8,4);

	ctx.bg(0,0,255);	
	ctx.box(22,2,8,4);
	 
	ctx.bg(0,0,255);	
	ctx.box(2,7,8,4);

	ctx.bg(0,0,255);
	ctx.box(12,7,8,4);

	ctx.bg(0,0,255);	
	ctx.box(22,7,8,4);

	ctx.bg(0,0,255);	
	ctx.box(2,12,8,4);

	ctx.bg(0,0,255);
	ctx.box(12,12,8,4);

	ctx.bg(0,0,255);	
	ctx.box(22,12,8,4);
}

var theGame = new Game();
theGame.getUserInput(() => {
	console.log(arguments);
}, '1')
.then(() => {
	theGame.drawBord();
});

