exports.command = 'eval';

const Discord = require('discord.js');
const Config = require('../../config.json');
const utils = require('../../utils.js');

exports.eval = {
    run: function(bot,suffix,msg) {
        if(msg.author.id != Config.ownerID) {
            const embed = new Discord.MessageEmbed()
			msg.channel.send(embed.setTimestamp().setTitle('Eval').addField('Error:', 'No Permission!').setColor(utils.colorGen()).setFooter('Casino Bot'))
				.then((message) => {
					msg.delete();
					message.delete({timeout: 10000});
				});
        } else{
            const embed = new Discord.MessageEmbed()
                .setTitle('Eval')
                .setDescription( eval(suffix,bot))
                .setFooter('Casino Bot')
                 .setColor([255,0,0])
                 .setTimestamp()
            msg.channel.send(embed)
				.then((message) => {
					msg.delete();
					message.delete({timeout: 30000});
				});
        }
    }
}