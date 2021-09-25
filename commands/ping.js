module.exports = {
    name: 'ping',
    premium: true,
    execute(messageCreate, client) {
        return messageCreate.channel.send(`🏓 | API Latency is ${Math.round(messageCreate.client.ws.ping)}ms`)
            .catch(err => console.log(err));
    },
};