const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const KongouInteraction = require('../../abstract/KongouInteraction.js');

class Play extends KongouInteraction {
    get name() {
        return 'play';
    }

    get description() {
        return 'Automatically fetches the video(s) and joins the voice channel you are in!';
    }
    
    get options() {
        return [{
            name: 'query',
            type: ApplicationCommandOptionType.String,
            description: 'The song you want to play',
            required: true,
        }];
    }

    get playerCheck() {
        return { voice: true, dispatcher: false, channel: false };
    }

    static checkURL(string) {
        try {
            new URL(string);
            return true;
        } catch (error) {
            return false;
        }
    }

    async run({ interaction }) {
        await interaction.deferReply();
        const query = interaction.options.getString('query', true);
        const node = this.client.shoukaku.getNode();
        if (Play.checkURL(query)) {
            const result = await node.rest.resolve(query);
            if (!result) 
                return interaction.editReply('Teitoku, I didn\'t find any song on the query you provided!');
            const { type, tracks, playlistName } = result;
            const track = tracks.shift();
            const playlist = type === 'PLAYLIST';
            const dispatcher = await this.client.queue.handle(interaction.guild, interaction.member, interaction.channel, node, track);
            if (playlist) {
                for (const track of tracks) await this.client.queue.handle(interaction.guild, interaction.member, interaction.channel, node, track);
            }   
            await interaction
                .editReply(playlist ? `Added the playlist \`${playlistName}\` in queue!` : `Added the track \`${track.info.title}\` in queue!`)
                .catch(() => null);
            dispatcher?.play();
            return;
        }
        let source = query.split(':', 2)[0];
        switch (source) {
            case 'soundcloud':
            case 'sc':
                source = 'soundcloud';
                break;
            
            case 'spotify':
                return interaction.editReply('Can\'t play Spotify tracks yet, sorry!');
            
            case 'local':
            case 'localhost':
            case 'lc':
            case 'media':
                source = 'local';
                break;
            
            case 'youtube':
            case 'yt':
            default:
                source = 'youtube';
                break;
        }
        const search = await node.rest.resolve(query, source);
        if (!search?.tracks.length)
            return interaction.editReply('Teitoku, I didn\'t find any song on the query you provided!');
        const track = search.tracks.shift();
        const dispatcher = await this.client.queue.handle(interaction.guild, interaction.member, interaction.channel, node, track);
        await interaction
            .editReply(`Added the track \`${track.info.title}\` in queue!`)
            .catch(() => null);
        dispatcher?.play();
    }
}
module.exports = Play;