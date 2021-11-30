import { GuildTextBasedChannel, TextChannel } from "discord.js";
import {client, row} from "../index";
import { Event } from "../structures/Event";

export default new Event("guildCreate", async (guild) => {
    let found = 0;
    guild.channels.cache.map((channel) => {
        if (found === 0) {
          if (channel.type === "GUILD_TEXT") {
            if (channel.permissionsFor(client.user).has("VIEW_CHANNEL") === true) {
              if (channel.permissionsFor(client.user).has("SEND_MESSAGES") === true) {
                try {
                (channel as GuildTextBasedChannel).send({content: `Hello - I'm VOTIFY! The only bot on discord to bear magical powers, I can handle all polls your community needs. All the polls are personally handled by specially trained eastern Witches, they are never known to commit a mistake. So are you well prepared to be a part of the magical moments?😉\n\nThanks for inviting me!✌\nStart with \/help and know all the commands\n\n Please vote us if you like the work and you can also join the support server for outages,updates and fun! ¯\\\_(ツ)\_/¯`, components: [row]});
                }catch (e){
                  console.log(e);
                }
            if(channel.permissionsFor(client.user).has("CREATE_INSTANT_INVITE") === true){
                try {
                    guild.invites.create(channel as TextChannel,{maxAge: 0, maxUses: 0}).then((invite) => {
                    (client.channels.cache.get('915162909787697224') as TextChannel).send(`I joined ${guild.name}! here's the invite ${invite}`);
                    });
                } catch (e) {
                    console.log(e);
                }
                }
             }
                
                found = 1;
              }
            }
          }
        });
    });