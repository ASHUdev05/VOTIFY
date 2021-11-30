"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const premium_1 = require("../../../models/premium");
const Command_1 = require("../../structures/Command");
exports.default = new Command_1.Command({
    name: "del-premium",
    description: "Owner only command",
    options: [{
            name: "target",
            description: "Select a user",
            type: "USER",
            required: false,
        }],
    run: async ({ interaction }) => {
        const user = interaction.options.getUser('target');
        if (interaction.user.id !== '793458406161121300')
            return interaction.editReply("You are not the owner of this bot.");
        const member = user;
        // message.mentions.members.first() || 
        // message.guild.members.cache.get(args[0]);
        if (!member)
            return interaction.editReply("Please specify a valid member!");
        premium_1.premiumGuildSchema.findOne({
            User: member.id
        }, async (err, data) => {
            if (!data)
                return interaction.editReply("This user does not have a premium account!");
            data.delete();
            interaction.editReply(`Removed ${member} from database!`);
        });
    }
});
