import {row} from "../index";
import { Event } from "../structures/Event";

export default new Event("messageCreate", async (message) => {
    if (message.author.bot) return;
    if(message.content.startsWith(`v!`)) message.reply({content: `We Came Back Stronger this time and have switched to slash commands completely (;
      
        use \/ to enjoy the same old features with new flavour!\n\n**NOTE**: The slash commands might not appear for you. Is it true? Don't worry we got you, we understand the mystical unknown error and have hired the power of the greatest eastern witch, she's here to help you. According to her, she suggests us to follow the below magical steps: "just invite the bot again through this link: https://discord.com/api/oauth2/authorize?client_id=875678983465885706&permissions=2147740736&scope=bot%20applications.commands"\n\n The witch's magic didn't work? Join the support server for further help and more magical potions (;`, components: [row as any]});
});