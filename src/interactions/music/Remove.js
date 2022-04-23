
const KongouInteraction = require('../../abstract/KongouInteraction.js');
const KongouDispatcher = require('../../modules/KongouDispatcher.js');
const { MessageEmbed } = require('discord.js');
const { ApplicationCommandOptionType } = require('discord-api-types/v9');


class Remove extends KongouInteraction {
    get name() {
        return 'remove';
    }

    get options() {
        return [{
            name: 'track',
            type: ApplicationCommandOptionType.Integer,
            description: 'The track you want to remove, by number in queue',
            required: true
        }];
    }

    get description() {
        return 'Removes a track from the current queue';
    }

    get playerCheck() {
        return { voice: false, dispatcher: true, channel: false };
    }

    async run({ interaction, dispatcher }) {
        const track = interaction.options.getInteger('track');
        if (!track) {
            return interaction.reply(`A track number must be provided, baka!`);
        }
        if (track >= 1 && track < dispatcher.queue?.length) {
            let removed = dispatcher.queue.splice(track - 1, 1)[0];
            return interaction.reply(`Removed track **${track}** - \`${removed.info.title}\` from queue.`);
        } else {
            return interaction.reply(`No track n°${track} found, please make sure you entered a valid track number (check \`/queue\`), baka!`);
        }
    }
}
module.exports = Remove;