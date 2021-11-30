require("dotenv").config();
import { ExtendedClient } from "./structures/Client";
import { connect } from "mongoose";
import { MessageActionRow, MessageButton, TextChannel } from 'discord.js';
import { premiumGuildSchema } from "../models/premium";
import day from "dayjs";
const Topgg = require("@top-gg/sdk");
const express = require("express");

export const client = new ExtendedClient();

import { AutoPoster } from 'topgg-autoposter';
const ap = AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3NTY3ODk4MzQ2NTg4NTcwNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjM4MTgxMTUxfQ.smxC427khGyj6L3rh_0PXkHSrxMDzktFNIOh1WSe2vk' , client)
const app = express();
const webhook = new Topgg.Webhook("Z5iMkSohfFtuq9Bpii911KilDizp1i3CSl");



export const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setLabel('Upvote us!')
        .setURL('https://top.gg/bot/875678983465885706/vote')
        .setStyle('LINK'),
      new MessageButton()
        .setLabel('Visit Website!')
        .setURL('https://ashudev05.github.io/VOTIFY/')
        .setStyle('LINK'),
      new MessageButton()
        .setLabel('Join the support Server!')
        .setURL('https://discord.gg/ZJ9Xts342B')
        .setStyle('LINK'),
    );


    app.post("/dblwebhook", webhook.listener(async vote => {
      // vote will be your vote object, e.g
      console.log(vote.user);// 395526710101278721 < user who voted\
      var temp = await client.users.fetch(vote.user);
      
      let server = client.guilds.cache.get('898945196019056661');
      var memberRole= server.roles.cache.find(role => role.name === "top.gg_VOTERS");
      let member = server.members.cache.get(temp.id);
      try {
      await member.roles.add(memberRole);
      } catch(e){
      console.log(e);
      }
      (client.channels.cache.get('899650683052122142') as TextChannel).send(`${temp.tag} has voted!`);
      temp.send(`Thank you for voting (:`);
            var current = new Date(); //'Mar 11 2015' current.getTime() = 1426060964567
            var followingDay = new Date(current.getTime() + 86400000); // + 1 day in ms
            premiumGuildSchema.findOne({
              User: vote.user
            }, async(err, data) => {
            
             if(data){ try {
               temp.send({content:`You have already got rewards for voting in last 24 hours! What you want double premium? 
      Anyways thanks for voting in less than 24 hours (:
      
      
      \`Note: If you have voted then you can get a special role in VOTIFY's support server. 
      (:\``, components: [row]});
            } catch (e){console.log(e);}
            }
             else {
               const Expire = day(followingDay).valueOf();
               new premiumGuildSchema({
                 User: vote.user,
                 Expire,
                 Permanent: false,
             }).save();
             try {
             return temp.send({content:`As a reward we have given you premium {lasts for 24 hours from now!}
      
      
      \`Note: If you have voted then you can get a special role in VOTIFY's support server. 
      (:\``, components: [row]});
             } catch (e) {console.log(e);}
            }
          });
      // You can also throw an error to the listener callback in order to resend the webhook after a few seconds
      }))
      
      app.listen(80);
    
    
     ap.on('posted', () => {
      console.log('Posted stats to Top.gg!')
      })

connect(process.env.dburl).then(() => {console.log('Connected to DB!')});


client.start();