require("dotenv").config();
import { ExtendedClient } from "./structures/Client";
import { connect } from "mongoose";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const client = new ExtendedClient();

export const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel('Upvote us!')
        .setURL('https://top.gg/bot/875678983465885706/vote')
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setLabel('Visit Website!')
        .setURL('https://ashudev05.github.io/VOTIFY/')
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setLabel('Join the support Server!')
        .setURL('https://discord.gg/ZJ9Xts342B')
        .setStyle(ButtonStyle.Link),
    );

connect(process.env.dburl).then(() => {console.log('Connected to DB!')});


client.start();