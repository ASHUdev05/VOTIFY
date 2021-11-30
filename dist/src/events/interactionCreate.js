"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Event_1 = require("../structures/Event");
const premium_1 = require("../../models/premium");
const index_1 = require("../index");
exports.default = new Event_1.Event("interactionCreate", async (interaction) => {
    // Chat Input Commands
    if (interaction.isCommand()) {
        await interaction.deferReply();
        const command = __1.client.commands.get(interaction.commandName);
        if (!command)
            return interaction.followUp("You have used a non existent command");
        try {
            console.log(interaction.commandName);
            premium_1.premiumGuildSchema.findOne({
                User: interaction.user.id
            }, async (err, data) => {
                if (!data && interaction.commandName != `claim-premium` && interaction.commandName != `help` && interaction.commandName != `vote`) {
                    try {
                        return interaction.editReply({
                            content: `This bot is a premium only bot. You can only use \`/help\` and \`/vote\` without premium.\nIf you've already voted then use \`/premium\` to claim your reward.\n\n (To get  24hours of premium vote on top.gg by using the command \`/vote\` . You can claim premium everyday by voting once every 24 hours.)`,
                            components: [index_1.row]
                        });
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                else if (interaction.commandName != `claim-premium` && interaction.commandName != `vote` && interaction.commandName != `help` && !data.Permanent && Date.now() > data.Expire) {
                    data.delete();
                    return interaction.editReply({ content: `Your premium has expired :(
                    \`claim again by voting on top.gg\`\nIf already voted use \/claim-premium to redeem rewards!`, components: [index_1.row] });
                }
                else if (data || interaction.commandName === `claim-premium` || interaction.commandName === `vote` || interaction.commandName === `help`)
                    await command.run({
                        args: interaction.options,
                        client: __1.client,
                        interaction: interaction
                    });
            });
        }
        catch (error) {
            console.error(error);
            return interaction.editReply('There was an error while executing this command!');
        }
    }
});
