import { Event } from "../structures/Event";
import { row } from "../index";
import { client } from "../index";
import { pollModel } from "../../models/poll";
import { ActivityType, TextChannel } from "discord.js";
import { Message } from "discord.js";
const fetchAll = require('../../util/fetchAll');
const emojiArray = require('../../util/optionArray');
const emojiArray1 = require('../../util/optArr');
const language = require("../language");

export default new Event("ready", () => {
    console.log("Bot is online");

    client.user.setStatus("idle");
    var activities = [ `${client.guilds.cache.size} servers`, `${client.users.cache.size} users!`, `v4.0.0`, 'WATCHING your polls!' ], i = 0;
    setInterval(() => client.user.setActivity(`\/help | ${activities[i++ % activities.length]}`, { type: ActivityType.Playing }),5000)

    setInterval(async () => {
        for (const guild of client.guilds.cache) {
            const pollArray = await pollModel.find({
                guild: guild[0],
            }).catch(err => console.log(err));

            for (const poll of pollArray) {
                if (Date.now() >= Number(poll.expiryDate)) {
                    const channel = client.channels.cache.get(poll.textChannel) as TextChannel;

          if(!channel) console.log("The poll channel magically disappeared! (:")

          else {
                    const msg = await channel.messages.fetch(poll.message).catch(err => console.log(err)) as Message;
                    const lang_guild = await client.guilds.fetch(poll.guild).catch(err => console.log(err));
                    const resultsArr = [];
                    const resultsArr1 = [];

                    for (const e of emojiArray()) {
                        const allReactions = await fetchAll(msg, e).catch(err => console.log(err));
                        resultsArr.push([e, typeof allReactions == 'object' ? allReactions.length : undefined]);
                    }
                    for (const e of emojiArray1()) {
                        const allReactions = await fetchAll(msg, e).catch(err => console.log(err));
                        resultsArr1.push([e, typeof allReactions == 'object' ? allReactions.length : undefined]);
                    }
                    //console.log(resultsArr1);
                    const chartDataArr = [];
                    const chartDataArr1 = [];
                    for (var i = 0; i < resultsArr.length; i++) {
                    var element = resultsArr[i];
                    if (element[1]!=undefined)
                    {
                        chartDataArr.push(element[1]);    
                    } 
                    };
                    for (var i = 0; i < resultsArr1.length; i++) {
                    var element = resultsArr1[i];
                    if (element[1]!=undefined)
                    {
                        chartDataArr1.push(element[1]);    
                    } 
                    };
                    //console.log(chartDataArr1);
                                        resultsArr.sort((a, b) => b[1] - a[1]);
                                        resultsArr1.sort((a, b) => b[1] - a[1]);

                                        if ((resultsArr[0][1] == resultsArr[1][1]) && (resultsArr1[0][1] == resultsArr1[1][1])) {
                    try{                       msg.reply({content:`${language(lang_guild, "POLL_RES_TIE")}!`, components:[row as any]});
                        }catch (e){ console.error(e);}
                                        }
                                        else if (resultsArr[0][1] != resultsArr[1][1]) {
                    try{                     msg.reply({content:`${language(lang_guild, "POLL_RES_WIN")} ${resultsArr[0][0]}`, components:[row as any]});
                        }catch (e){console.error(e)}
                                        }
                                        else if (resultsArr1[0][1] != resultsArr1[1][1]) {
                    try{                   msg.reply({content:`${language(lang_guild, "POLL_RES_WIN")} ${resultsArr1[0][0]}`, components:[row as any]});
                        }catch (e){console.error(e)}
                                        }
                            }

                                        await poll.deleteOne().catch(err => console.log(err));
                                    }
                                }
                            }
                        }, 30000);
                    });