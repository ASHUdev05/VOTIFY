module.exports = {
    name: 'ping',
    execute(message, client) {
        return message.channel.send(`🏓 | API Latency is ${Math.round(message.client.ws.ping)}ms`)
            .catch(err => console.log(err));
    },
};