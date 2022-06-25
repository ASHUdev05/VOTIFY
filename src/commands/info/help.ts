import { Command } from "../../structures/Command";
import { row, client } from "../../index";
import { EmbedBuilder } from "discord.js";
const language = require("../../language");
let embed = new EmbedBuilder();

export default new Command({
    name: "help",
    description: "Are you stuck step-user?",
    run: async ({ interaction }) => {
    const { guild } = interaction;
    const exampleEmbed = new EmbedBuilder()
	.setColor('#0099ff')
	.setTitle(language(guild, "HELP_TITLE"))
	.setDescription(`
    ${(language)(guild, "MADE_IN")}

  
    **${(language)(guild, "HELP_POLLS")}**
    ${(language)(guild, "HELP_CREATE_POLL")}
    \`/poll timed_poll:<false> title:<title> <options>\`

    ${(language)(guild, "HELP_CREATE_POLL_E")}
    \`/poll timed_poll:<true> title:<title> time:<time>  <options>\`
    
    ${(language)(guild, "HELP_CREATE_YN_POLL")}
    \`/ynpoll timed_poll:<false> title:<title>\`
    
    ${(language)(guild, "HELP_CREATE_YN_POLL_E")}
    \`/ynpoll timed_poll:<true> title:<title> time:<time>\`

    **${(language)(guild, "HELP_NOTE")}** ${(language)(guild, "HELP_EACH_OPTION")}

    **${(language)(guild, "HELP_TO_INVITE")}** \`/invite\`

    **${(language)(guild, "HELP_LANGUAGE")}** 
    ${(language)(guild, "HELP_LANGUAGE_DESC")} \`/setlang <language>\`
    eg:- \`/setlang spanish\`

    **${(language)(guild, "HELP_OTHER_COMMANDS")}**
    ${client.commands.filter(c => c.name != 'poll' && c.name != 'ynpoll' && c.name != 'add-premium' && c.name != 'del-premium').map(c => `\`${c.name}\``).join(' ')}
    
    **${(language)(guild, "HELP_STILL_HAVE_QUESTIONS")}** 
    ${(language)(guild, "HELP_JOIN_OUR_SERVER")} : https://discord.gg/ZJ9Xts342B
    
    `)
	.setThumbnail(interaction.client.user.displayAvatarURL({ extension: 'png' }))
    .setTimestamp()
	.setFooter({ text:`${language(guild, "REQUESTED_BY")} ${interaction.user.tag}`, iconURL:interaction.user.displayAvatarURL({ extension: 'png' })});

interaction.followUp({ embeds: [exampleEmbed], components: [row as any] })
    .catch(err => console.log(err));
	},
});