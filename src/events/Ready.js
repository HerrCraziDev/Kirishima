const KongouEvent = require('../abstract/KongouEvent.js');
const { dev, statuses, statusTimer } = require('../../config.json');

class Ready extends KongouEvent {
    get name() {
        return 'ready';
    }

    get once() {
        return true;
    }

    async run() {
        this.client.logger.log(`${this.client.user.username}`, `Ready! Serving ${this.client.guilds.cache.size} guild(s) with ${this.client.users.cache.size} user(s)`);
        if (dev) {
            await this.client.user.setActivity('I\'m under maintenance, please stand by.');
            await this.client.user.setStatus('dnd');
        } else {
            await this.client.user.setStatus('online'); 
            statuses.sort((a, b) => (Math.random() - 0.5));

            if (!this.interval) {
                await this.client.user.setActivity("Aloha, it's me, your favorite retarded shipgirl! Nice to meet you!");
                this.interval = setInterval(() => {
                    const current = statuses.shift();
                    this.client.user.setActivity(current);
                    statuses.push(current);
                }, statusTimer);
            }
        }
    }
}
module.exports = Ready;
