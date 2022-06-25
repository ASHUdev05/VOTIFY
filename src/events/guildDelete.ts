import { TextChannel } from "discord.js";
import { client } from "../index"
import { Event } from "../structures/Event"
export default new Event("guildDelete", async (guild) => {
    (client.channels.cache.get('915162909787697224')as TextChannel).send(`I left ${guild.name} that had ${guild.memberCount} members!`).catch(err => console.log(err));
});