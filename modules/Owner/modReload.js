exports.command = 'modReload';

const Discord = require('discord.js');
const mod = require('../../modules.js');
const Config = require('../../config.json');
const utils = require('../../utils.js');

exports.modReload = {
	run: function(bot,suffix,msg) {	
		if(msg.author.id === Config.ownerID){
			mod.reload()
			const embed = new Discord.MessageEmbed()
				.setTitle('Module Reload')
				.setDescription(`Modules Reloaded! Now Running ${mod.commandCount} modules!`)
				.setFooter('Casino Bot')
				.setTimestamp()
				.setColor(utils.colorGen());
			msg.channel.send(embed)
				.then((message) => {
					msg.delete();
					message.delete({timeout: 10000});
				});
		} else {
			const embed = new Discord.RichEmbed()
			msg.channel.sendEmbed(embed.setTimestamp().setTitle('Module Reload').addField('Error:', 'No Permission!').setColor([255,0,0]).setFooter('Casino Bot'))
				.then((message) => {
					msg.delete();
					message.delete({timeout: 10000});
				});
		}
	}
}