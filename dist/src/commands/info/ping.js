"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../structures/Command");
const index_1 = require("../../index");
exports.default = new Command_1.Command({
    name: "ping",
    description: "replies with pong",
    run: async ({ interaction }) => {
        interaction.followUp({ content: `🏓 | API Latency is ${Math.round(interaction.client.ws.ping)}ms`, components: [index_1.row] })
            .catch(err => console.log(err));
    }
});
