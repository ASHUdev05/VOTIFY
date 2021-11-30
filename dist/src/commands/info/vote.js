"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../structures/Command");
const discord_js_1 = require("discord.js");
exports.default = new Command_1.Command({
    name: "vote",
    description: "vote me to let me grow (:",
    run: async ({ interaction }) => {
        const row = new discord_js_1.MessageActionRow()
            .addComponents(new discord_js_1.MessageButton()
            .setLabel('top.gg!')
            .setURL('https://top.gg/bot/875678983465885706/vote')
            .setStyle('LINK'), new discord_js_1.MessageButton()
            .setLabel('Discord Bot List!')
            .setURL('https://discordbotlist.com/bots/votify/upvote')
            .setStyle('LINK'), new discord_js_1.MessageButton()
            .setLabel('Disbots!')
            .setURL('https://disbots.net/vote/875678983465885706')
            .setStyle('LINK'));
        interaction.editReply({ content: `Upvote me on the following Bot Lists!
    \`\`\`Note: Only voting on top.gg gives you premium.  (:\`\`\``, components: [row] })
            .catch(err => console.log(err));
    }
});
