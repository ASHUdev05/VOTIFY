import { Command } from "../../structures/Command";
import { row } from "../../index";
const language = require("../../language");

export default new Command({
    name: "ping",
    description: "replies with pong",
    run: async ({ interaction }) => {
        const { guild } = interaction;
        interaction.followUp({content:`🏓 | ${language(guild, "PING")} ${Math.round(interaction.client.ws.ping)}ms`, components: [row as any]})
        .catch(err => console.log(err));
    }
});