const Chalk = require('chalk');
const log = require('./log.js');

exports.addCoins = function(user, bot, random, amount) {
	
	if(random) {
		
		let rand = Math.floor(Math.random() * 5);
		
		bot.coins[user] += rand;
		bot.db.put('coins', bot.coins);
		
		log.log(`Added ${rand} coins to user id ${user}! ` + Chalk.cyan('[RANDOM]')); 
		
	} else {
		
		if(amount <= 0) {
			
			log.warn(`Tried adding a value less then or equal to 0 to user id ${user}! This is not allowed!`);
			return;
			
		} else {
			
			bot.coins[user] += amount;
			bot.db.put('coins', bot.coins);
			
			log.log(`Added ${amount} coins to user id ${user}! ` + Chalk.cyan('[SET]'));
			
		}
		
	}
	
}

exports.getCoins = function(user, bot) {
	
	return bot.coins[user];
	
}