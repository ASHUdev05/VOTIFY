"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../structures/Event");
const index_1 = require("../index");
const index_2 = require("../index");
const poll_1 = require("../../models/poll");
const fetchAll = require('../../util/fetchAll');
const emojiArray = require('../../util/optionArray');
const emojiArray1 = require('../../util/optArr');
exports.default = new Event_1.Event("ready", () => {
    console.log("Bot is online");
    index_2.client.user.setStatus("idle");
    var activities = [`${index_2.client.guilds.cache.size} servers`, `${index_2.client.users.cache.size} users!`, `v4.0.0`, 'WATCHING your polls!'], i = 0;
    setInterval(() => index_2.client.user.setActivity(`\/help | ${activities[i++ % activities.length]}`, { type: "PLAYING" }), 5000);
    setInterval(async () => {
        for (const guild of index_2.client.guilds.cache) {
            const pollArray = await poll_1.pollModel.find({
                guild: guild[0],
            }).catch(err => console.log(err));
            for (const poll of pollArray) {
                if (Date.now() >= Number(poll.expiryDate)) {
                    const channel = index_2.client.channels.cache.get(poll.textChannel);
                    if (!channel)
                        console.log("The poll channel magically disappeared! (:");
                    else {
                        const msg = await channel.messages.fetch(poll.message).catch(err => console.log(err));
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
                        console.log(resultsArr1);
                        const chartDataArr = [];
                        const chartDataArr1 = [];
                        for (var i = 0; i < resultsArr.length; i++) {
                            var element = resultsArr[i];
                            if (element[1] != undefined) {
                                chartDataArr.push(element[1]);
                            }
                        }
                        ;
                        for (var i = 0; i < resultsArr1.length; i++) {
                            var element = resultsArr1[i];
                            if (element[1] != undefined) {
                                chartDataArr1.push(element[1]);
                            }
                        }
                        ;
                        console.log(chartDataArr1);
                        resultsArr.sort((a, b) => b[1] - a[1]);
                        resultsArr1.sort((a, b) => b[1] - a[1]);
                        if ((resultsArr[0][1] == resultsArr[1][1]) && (resultsArr1[0][1] == resultsArr1[1][1])) {
                            try {
                                msg.reply({ content: `It was a tie!`, components: [index_1.row] });
                            }
                            catch (e) {
                                console.error(e);
                            }
                        }
                        else if (resultsArr[0][1] != resultsArr[1][1]) {
                            try {
                                msg.reply({ content: `The winner of the poll was option ${resultsArr[0][0]}`, components: [index_1.row] });
                            }
                            catch (e) {
                                console.error(e);
                            }
                        }
                        else if (resultsArr1[0][1] != resultsArr1[1][1]) {
                            try {
                                msg.reply({ content: `The winner of the poll was option ${resultsArr1[0][0]}`, components: [index_1.row] });
                            }
                            catch (e) {
                                console.error(e);
                            }
                        }
                    }
                    await poll.deleteOne().catch(err => console.log(err));
                }
            }
        }
    }, 30000);
});
