//BaconHawkJS Bot Frame Work by Bacon_Space & NiteHawk Please refer to https://github.com/BaconHawk/BaconHawkJS for help!
const Discord = require('discord.js');
const bot = new Discord.Client();
const chalk = require('chalk');
const Package = require('./package.json');
const XPDB= require('xpdb');
const db = bot.db = new XPDB('./guildDB');
const log = require('./log.js');
let Config;

//Get Config Data from config.json
try{
	Config = require('./config.json');
} catch(e) {
	log.error('Please create a config.json file in the main directory based off of the config.json.example file!\n' + e.stack);
	process.exit();
}

//dont change this at all
let commands = {};

//Feel free to change this
function checkForCommand(msg) {
	let prefix = bot.prefixes[msg.guild.id] || Config.prefix;
	if(msg.author.id != bot.user.id && msg.content.startsWith(prefix)){
		
		let cmdTxt = msg.content.split(' ')[0].substring(prefix.length).toLowerCase();
		let suffix = msg.content.substring(cmdTxt.length+prefix.length+1);

		let cmd = commands[cmdTxt];
		
		if(cmd){
			try{
				cmd.run(bot,suffix,msg);
			} catch(e) {
				log.error(e.stack);
				var msgTxt = `Command ${cmdTxt} was unable to run!`;
				msg.channel.send(msgTxt);
			}
		}
	}
}

bot.on('message', msg => checkForCommand(msg));
bot.on('ready', () => {
	log.good('Logged in as ' + chalk.cyan(`${bot.user.tag}`) + '!');
	require("./modules.js").init();
	bot.db.get('prefixes').then(prefixes => bot.prefixes = prefixes || {}).catch(err => {
    	console.error(err);
    	process.exit(1);
	});
});


exports.addCommand = function(commandName, commandObject){
    try {
        commands[commandName] = commandObject;
    } catch(err){
        log.error(err);
    }
}

if(Config.bot_token){
	bot.login(Config.bot_token);
} else{
	
}

process.on('uncaughtException', (err) => {
    let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
    console.error(errorMsg);
});

process.on('unhandledRejection', err => {
    console.error('Uncaught Promise Error: \n' + err.stack);
});