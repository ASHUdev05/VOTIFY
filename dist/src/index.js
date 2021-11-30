"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.row = exports.client = void 0;
const tslib_1 = require("tslib");
require("dotenv").config();
const Client_1 = require("./structures/Client");
const mongoose_1 = require("mongoose");
const discord_js_1 = require("discord.js");
const premium_1 = require("../models/premium");
const dayjs_1 = (0, tslib_1.__importDefault)(require("dayjs"));
const Topgg = require("@top-gg/sdk");
const express = require("express");
exports.client = new Client_1.ExtendedClient();
const topgg_autoposter_1 = require("topgg-autoposter");
const ap = (0, topgg_autoposter_1.AutoPoster)('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3NTY3ODk4MzQ2NTg4NTcwNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjM4MTgxMTUxfQ.smxC427khGyj6L3rh_0PXkHSrxMDzktFNIOh1WSe2vk', exports.client);
const app = express();
const webhook = new Topgg.Webhook("Z5iMkSohfFtuq9Bpii911KilDizp1i3CSl");
exports.row = new discord_js_1.MessageActionRow()
    .addComponents(new discord_js_1.MessageButton()
    .setLabel('Upvote us!')
    .setURL('https://top.gg/bot/875678983465885706/vote')
    .setStyle('LINK'), new discord_js_1.MessageButton()
    .setLabel('Visit Website!')
    .setURL('https://ashudev05.github.io/VOTIFY/')
    .setStyle('LINK'), new discord_js_1.MessageButton()
    .setLabel('Join the support Server!')
    .setURL('https://discord.gg/ZJ9Xts342B')
    .setStyle('LINK'));
app.post("/dblwebhook", webhook.listener(async (vote) => {
    // vote will be your vote object, e.g
    console.log(vote.user); // 395526710101278721 < user who voted\
    var temp = await exports.client.users.fetch(vote.user);
    let server = exports.client.guilds.cache.get('898945196019056661');
    var memberRole = server.roles.cache.find(role => role.name === "top.gg_VOTERS");
    let member = server.members.cache.get(temp.id);
    try {
        await member.roles.add(memberRole);
    }
    catch (e) {
        console.log(e);
    }
    exports.client.channels.cache.get('899650683052122142').send(`${temp.tag} has voted!`);
    temp.send(`Thank you for voting (:`);
    var current = new Date(); //'Mar 11 2015' current.getTime() = 1426060964567
    var followingDay = new Date(current.getTime() + 86400000); // + 1 day in ms
    premium_1.premiumGuildSchema.findOne({
        User: vote.user
    }, async (err, data) => {
        if (data) {
            try {
                temp.send({ content: `You have already got rewards for voting in last 24 hours! What you want double premium? 
      Anyways thanks for voting in less than 24 hours (:
      
      
      \`Note: If you have voted then you can get a special role in VOTIFY's support server. 
      (:\``, components: [exports.row] });
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            const Expire = (0, dayjs_1.default)(followingDay).valueOf();
            new premium_1.premiumGuildSchema({
                User: vote.user,
                Expire,
                Permanent: false,
            }).save();
            try {
                return temp.send({ content: `As a reward we have given you premium {lasts for 24 hours from now!}
      
      
      \`Note: If you have voted then you can get a special role in VOTIFY's support server. 
      (:\``, components: [exports.row] });
            }
            catch (e) {
                console.log(e);
            }
        }
    });
    // You can also throw an error to the listener callback in order to resend the webhook after a few seconds
}));
app.listen(80);
ap.on('posted', () => {
    console.log('Posted stats to Top.gg!');
});
(0, mongoose_1.connect)(process.env.dburl).then(() => { console.log('Connected to DB!'); });
exports.client.start();
