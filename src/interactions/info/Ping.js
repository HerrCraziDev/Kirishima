const KongouInteraction = require('../../abstract/KongouInteraction.js');

class Ping extends KongouInteraction {
    get name() {
        return 'ping';
    }

    get description() {
        return 'Basic pongy command!';
    }

    async run({ interaction }) {
        const message = await interaction.deferReply({ fetchReply: true });
        await interaction.editReply(`<:kannawave:705431761483726962> Panpakapan! Took \`${Math.round(message.createdTimestamp - interaction.createdTimestamp)}ms\``);
    }
}
module.exports = Ping;