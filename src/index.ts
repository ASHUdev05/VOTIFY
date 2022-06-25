require("dotenv").config();
import { ExtendedClient } from "./structures/Client";
import { connect } from "mongoose";
import { MessageActionRow, MessageButton, TextChannel } from 'discord.js';

export const client = new ExtendedClient();

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

connect(process.env.dburl).then(() => {console.log('Connected to DB!')});


client.start();