import { Command } from "../../structures/Command";
import { row } from "../../index";
import { languages } from "../../lang.json";
import { languageModel } from "../../../models/language";
const { setLanguage } = require("../../language")
import { ApplicationCommandOptionType, CommandInteraction, CommandInteractionOption, CommandInteractionOptionResolver } from "discord.js";

export default new Command({
    name: "setlang",
    description: "Sets the language for the bot.",
    options: [{
        name: "language",
        description: "Enter the language you want to set the bot to.",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [{
            name: `english`,
            value: `english`,
            },
            {
            name: `spanish`,
            value: `spanish`,
            },
            {
            name: `arabic`,
            value: `arabic`,
            },
            {
            name: `kannada`,
            value: `kannada`,
            },
            {
            name: `korean`,
            value: `korean`,
            },],
    }],
    run: async ({ interaction }) => {
        const lang = (interaction.options as CommandInteractionOptionResolver).getString('language').toLowerCase();
        if(!interaction.member.permissions.has("Administrator"))
            return interaction.followUp({ 
                content: `Only Administrators can set the language for servers!`, 
                components: [row as any] 
            }).catch(err => console.log(err));
        if(!languages.includes(lang))
            return interaction.followUp({
                content: `${lang} is not a valid language in our translations yet!`,
                components: [row as any]
            }).catch(err => console.log(err));
        setLanguage(interaction.guild, lang);
       
        await languageModel.findOneAndUpdate({
            _id: interaction.guild.id
        }, {
            _id: interaction.guild.id,
            language: lang
        }, {
            upsert: true
        }).then(() => {
            interaction.followUp({
                content: `${interaction.guild.name}'s language has been set to ${lang}!`,
                components: [row as any]
            })}).catch(err => console.log(err));
        }
});