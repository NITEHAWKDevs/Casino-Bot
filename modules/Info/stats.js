exports.command = 'stats';

const Discord = require('discord.js');
const Config = require('../../config.json');
const utils = require('../../utils.js');

exports.stats = {
	run: function(bot,suffix,msg) {
		if(msg.author.id == Config.ownerID) {
			const embed = new Discord.MessageEmbed()
				.setTitle('Server Stats')
				.addField('Users:', `${bot.guilds.cache.get(msg.guild.id).members.cache.filter(u => !u.user.bot).size}`, true)
				.addField('Bots:', `${bot.guilds.cache.get(msg.guild.id).members.cache.filter(u => u.user.bot).size}`, true)
				.addField('Channels:', `${bot.guilds.cache.get(msg.guild.id).channels.cache.size}`, true)
				.setFooter('Casino Bot')
				.setTimestamp()
				.setColor(utils.colorGen())
			msg.channel.send(embed)
			.then((message) => {
				msg.delete();
				message.delete({timeout: 15000});
			});
		} else {
			const embed = new Discord.MessageEmbed()
			msg.channel.send(embed.setTimestamp().setTitle('Stats').addField('Error:', 'No Permission!').setColor(utils.colorGen()).setFooter('Casino Bot'))
				.then((message) => {
					msg.delete();
					message.delete({timeout: 10000});
				});	
		}
	}
}