
const KongouInteraction = require('../../abstract/KongouInteraction.js');
const KongouDispatcher = require('../../modules/KongouDispatcher.js');
const { MessageEmbed } = require('discord.js');

class Current extends KongouInteraction {
    get name() {
        return 'current';
    }

    get description() {
        return 'Shows the current playing track!';
    }

    get playerCheck() {
        return { voice: false, dispatcher: true, channel: false };
    }

    async run({ interaction, dispatcher }) {
        let current = dispatcher.current.info;

        const embed = new MessageEmbed()
            .setColor(this.client.color)
            .setAuthor('🎧 Now Playing')
            .setThumbnail(`https://img.youtube.com/vi/${current.identifier}/default.jpg`)
            .setDescription(
                `**[${current.title}](${current.uri})** [${KongouDispatcher.humanizeTime(current.length)}]\n` +
                `\`${KongouDispatcher.humanizeTime(current.position)}\` \`${('█'.repeat(current.position / current.length * 15)).padEnd(15, ' ')}\` \`${KongouDispatcher.humanizeTime(current.length)}\``
            )
            .setFooter(`${this.client.user.username} • 🔊 ${dispatcher.channel.name}`, this.client.user.displayAvatarURL());
        await interaction.reply({ embeds: [embed] });
    }
}
module.exports = Current;