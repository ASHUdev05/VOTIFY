import { Command } from "../../structures/Command";
import { row } from "../../index";

export default new Command({
    name: "ping",
    description: "replies with pong",
    run: async ({ interaction }) => {
        interaction.followUp({content:`🏓 | API Latency is ${Math.round(interaction.client.ws.ping)}ms`, components: [row]})
        .catch(err => console.log(err));
    }
});