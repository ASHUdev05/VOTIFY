import { premiumGuildSchema } from "../../../models/premium";
import { Command } from "../../structures/Command";

export default new Command({
    name: "add-premium",
    description: "Owner command only",
    options: [{
        name: "target",
        description: "Select a user",
        type: "USER",
        required: false,
    }],
    run: async ({ interaction }) => {
        const user = interaction.options.getUser('target');
		if(interaction.user.id !== '793458406161121300') return interaction.editReply("You are not the owner of this bot.");

         const member = user;
        
         if(!member) return interaction.editReply("Please specify a valid member!");

         premiumGuildSchema.findOne({
             User: member.id
         }, async(err, data) => {
            if(data) data.delete();
         
             
                new premiumGuildSchema({
                    User: member.id,
                    Expire: 0,
                    Permanent: true,
                }).save();
            
            interaction.editReply("Saved data!");  
        });
    }
});