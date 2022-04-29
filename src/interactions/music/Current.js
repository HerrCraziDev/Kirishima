
const KongouInteraction = require('../../abstract/KongouInteraction.js');
const KongouDispatcher = require('../../modules/KongouDispatcher.js');
const { MessageEmbed } = require('discord.js');

const barSize = 25;

class Current extends KongouInteraction {

    get name() {
        return 'current';
    }

    get description() {
        return 'Shows the currently playing track!';
    }

    get playerCheck() {
        return { voice: false, dispatcher: true, channel: false };
    }

    async run({ interaction, dispatcher }) {
        const current = dispatcher.current.info;

        const embed = new MessageEmbed()
            .setColor(this.client.color)
            .setAuthor('🎧 Now Playing')
            .setThumbnail(`https://img.youtube.com/vi/${current.identifier}/default.jpg`)
            .setDescription(
                `**[${current.title}](${current.uri})** [${KongouDispatcher.humanizeTime(current.length)}]\n` +
                `\`${KongouDispatcher.humanizeTime(dispatcher.player.position)}\` \`${('█'.repeat(dispatcher.player.position / current.length * barSize)).padEnd(barSize, ' ')}\` \`${KongouDispatcher.humanizeTime(current.length)}\``
            )
            .setFooter(`${this.client.user.username} • ${dispatcher.queue.length} total songs in queue • 🔊 ${dispatcher.channel.name}`, this.client.user.displayAvatarURL());
        await interaction.reply({ embeds: [embed] });
    }
}
module.exports = Current;