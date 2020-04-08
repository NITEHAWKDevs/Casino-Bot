const chalk = require('chalk');

exports.log = function(msg) {
	
	console.log('[LOG]  ' + msg);
	
}

exports.good = function(msg) {

	console.log(chalk.green('[GOOD] ') + msg);

}

exports.warn = function(msg) {

	console.log(chalk.yellow('[WARN] ') + msg);

}

exports.error = function(msg) {
	
	console.log(chalk.red('[BAD]  ') + msg);
	
}