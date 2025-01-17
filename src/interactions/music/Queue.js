
const KongouInteraction = require('../../abstract/KongouInteraction.js');
const KongouDispatcher = require('../../modules/KongouDispatcher.js');
const { MessageEmbed } = require('discord.js');

const maxItems = 20;
class Queue extends KongouInteraction {
    get name() {
        return 'queue';
    }

    get description() {
        return 'Shows the current queue for this guild!';
    }

    get playerCheck() {
        return { voice: false, dispatcher: true, channel: false };
    }

    async run({ interaction, dispatcher }) {
        const queue = dispatcher.queue.length > maxItems ? dispatcher.queue.slice(0, maxItems) : dispatcher.queue;
        const embed = new MessageEmbed()
            .setColor(this.client.color)
            .setTitle('▶️ Now Playing')
            .setThumbnail(`https://img.youtube.com/vi/${dispatcher.current.info.identifier}/default.jpg`)
            .setDescription(`[${dispatcher.current.info.title}](${dispatcher.current.info.uri}) [${KongouDispatcher.humanizeTime(dispatcher.current.info.length)}]`)
            .setFooter(`${this.client.user.username} • ${dispatcher.queue.length} total songs in queue`, this.client.user.displayAvatarURL());
        if (queue.length) embed.addField('⏩ Up Next', queue.map((track, index) => `**${index + 1} 〉** __${track.info.title}__ • ${track.info.author}`).join('\n'));
        await interaction.reply({ embeds: [ embed ] });
    }
}
module.exports = Queue;