import { Command } from "../../structures/Command";
import { row } from "../../index";
import { MessageEmbed } from "discord.js";

export default new Command({
    name: "info",
    description: "some facts about me...",
    run: async ({ interaction }) => {
        const infoEmbed = new MessageEmbed()
        .setAuthor("VOTIFY's Info/Credits", interaction.client.user.avatarURL())
        .setColor(0xFF0000)
        .setFooter("✅  ||  embed by VOTIFY")
        .addField("📝 Credits:", `Bot by !NF!N!TY#8699\n`)
        .addField("📆 Launched:", '15th AUGUST , 2021\n')
        .addField("👪 Total Users:", `${interaction.client.users.cache.size}`)
        .addField("💬 Total Servers:", `${interaction.client.guilds.cache.size}`)
        .addField("✅ Official Server:", "https://discord.gg/ZJ9Xts342B")
        .addField("💻 Source Code:", "Not Available Yet");
      interaction.editReply({ embeds: [infoEmbed], components: [row] }).catch(err => console.log(err));
    }
});