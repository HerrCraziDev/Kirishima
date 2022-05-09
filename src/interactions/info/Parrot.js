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
        }]
    }

    async run({ interaction }) {
        const message = interaction.options.getString('message');
        if (message) interaction.reply(message);
        else interaction.reply("Baka !");
    }
}
module.exports = Parrot;