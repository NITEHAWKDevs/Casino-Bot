const Discord = require('./bot.js');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = require('./log.js');

exports.init = function(){
    load_modules();
};

exports.reload = function() {
	reload_modules();
};

function getDir(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

const mainDir = './modules/';
const mainDirs = getDir(mainDir);

function reload_modules() {
	for (let i = 0; i<mainDirs.length; i++) {
		function getFile(srcpath) {
			return fs.readdirSync(srcpath).filter(function(file) {
				return fs.statSync(path.join(srcpath, file)).isFile();
			});
		}
		
		const moduleFile = getFile(mainDir + mainDirs[i]);
		
		for (let j = 0; j<moduleFile.length; j++) {
			
			try {
				delete require.cache[require.resolve(mainDir + mainDirs[i] + '/' + moduleFile[j])];
			} catch(err) {
				
			}
		}
	}
	load_modules();
}


function load_modules() {
	
	log.log('Loading Modules...');
	
	let commandCount = 0;
	
	for (let i = 0; i<mainDirs.length; i++) {
		function getFile(srcpath) {
			return fs.readdirSync(srcpath).filter(function(file) {
				return fs.statSync(path.join(srcpath, file)).isFile();
			});
		}
		
		const moduleFile = getFile(mainDir + mainDirs[i]);
		
		for (let j = 0; j<moduleFile.length; j++) {
			let mod;
			
			try {
				mod = require(mainDir + mainDirs[i] + '/' + moduleFile[j]);
				if ("command" in mod) {
						Discord.addCommand(mod.command.toLowerCase(), mod[mod.command])
						commandCount++;
				}
			} catch(err) {
				log.error(` The module ${moduleFile[j]} is set-up incorrectly!\n${err.stack}`);
			}
		}
	}
	exports.commandCount = commandCount;
	
	if(commandCount == 1) {
		
		log.good(chalk.blue('Success!') + ` ${commandCount} module has been loaded!`)
		
	} else {
		
		log.good(chalk.blue('Success!') + ` ${commandCount} modules have been loaded!`);
	
	}
}