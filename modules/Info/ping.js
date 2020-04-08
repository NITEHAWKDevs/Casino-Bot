exports.command = 'ping';

const Discord = require('discord.js');
const Config = require('../../config.json');
const log = require('../../log.js');
const utils = require('../../utils.js');

exports.ping = {
	run: function(bot,suffix,msg) {
		if(msg.author.id == Config.ownerID) {
			const embed = new Discord.MessageEmbed();
			msg.channel.send('Ping?')
				.then((message) => {
					try{
						message.channel.send({embed: embed.setTitle("Pong!").addField("Took:", `${message.createdTimestamp - msg.createdTimestamp}ms!`).setFooter('Casino Bot!').setTimestamp().setColor(utils.colorGen())})
							.then((newMessage) => {
								msg.delete();
								message.delete();
								newMessage.delete({timeout: 10000});
							});
					} catch(e) {
						log.error(e.stack);
					}
				});
		} else {
			const embed = new Discord.MessageEmbed()
			msg.channel.send(embed.setTimestamp().setTitle('Ping').addField('Error:', 'No Permission!').setColor(utils.colorGen()).setFooter('Casino Bot'))
				.then((message) => {
					msg.delete();
					message.delete({timeout: 10000});
				});	
		}
	}
}