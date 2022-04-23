const KongouEvent = require('../abstract/KongouEvent.js');

class VoiceUpdate extends KongouEvent {
    get name() {
        return 'voiceStateUpdate';
    }

    get once() {
        return false;
    }

    async run(oldState, newState) {
        if (!oldState.channelId && newState.channelId) {
            this.client.logger.log(
                this.constructor.name,
                ` User '${newState.member.user.username}' joined voice channel '${newState.channel?.name}' in '${newState.guild.name}'`
            );
        } else if (oldState.channelId && !newState.channelId) {
            this.client.logger.log(
                this.constructor.name,
                ` User '${newState.member.user.username}' left voice channel '${oldState.channel?.name}' in '${newState.guild.name}'`
            );
        }

        // console.log(oldState, newState);
    }
}
module.exports = VoiceUpdate;