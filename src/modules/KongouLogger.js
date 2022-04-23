const { isMaster } = require('cluster');
const { dev } = require('../../config.json');

class KongouLogger {
    get id() {
        return isMaster ? 'Parent' : process.env.CLUSTER_ID;
    }

    debug(title, message) {
        if (dev) console.log(`[Process ${process.pid}] [Cluster ${this.id}] [${title}] ${message}`);
    }

    log(title, message) {
        console.log(`[Process ${process.pid}] [Cluster ${this.id}] [${title}] ${message}`);
    }

    error(error) {
        console.error(`[Process ${process.pid}] [Cluster ${this.id}] `, error);
    }
}

module.exports = KongouLogger;
