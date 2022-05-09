const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const KongouInteraction = require('../../abstract/KongouInteraction.js');

class Parrot extends KongouInteraction {
    get name() {
        return 'parrot';
    }

    get description() {
        return 'Baka !';
    }

    get options() {
        return [{
            name: 'message',
            type: ApplicationCommandOptionType.String,
            description: "The message to repeat",
            required: false
        },
        {
            name: 'in',
            type: ApplicationCommandOptionType.Channel,
            description: "Channel to send to, current one by default",
            required: false
        }]
    }

    async run({ interaction }) {
        await interaction.deferReply({ephemeral: true});

        const message = interaction.options.getString('message');
        const channel = interaction.options.getChannel('in') ?? interaction.channel;

        if (!channel?.viewable || !channel?.permissionsFor(this.client.user).has('SEND_MESSAGES')) {
            interaction.editReply(`I can't write messages to <#${channel.id}>, baka !`);
            return;
        }

        if (message) {
            this.client.logger.debug(this.constructor.name, message);
            await channel.send(message);
            interaction.editReply("Sent !");
        } else interaction.editReply("Baka !");
    }
}
module.exports = Parrot;