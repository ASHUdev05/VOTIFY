import { Command } from "../../structures/Command";
import { row } from "../../index";
import { languages } from "../../lang.json";
import { languageModel } from "../../../models/language";
const language = require("../../language");

export default new Command({
    name: "setlang",
    description: "Sets the language for the bot.",
    options: [{
        name: "language",
        description: "Enter the language you want to set the bot to.",
        type: "STRING",
        required: true,
    }],
    run: async ({ interaction }) => {
        const lang = interaction.options.getString('language').toLowerCase();
        if(!interaction.member.permissions.has("ADMINISTRATOR"))
            return interaction.followUp({ 
                content: `Only Administrators can set the language for servers!`, 
                components: [row] 
            }).catch(err => console.log(err));
        if(!languages.includes(lang))
            return interaction.followUp({
                content: `${lang} is not a valid language in our translations yet!`,
                components: [row]
            }).catch(err => console.log(err));
        language.setLanguage(interaction.guild, lang);
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
                components: [row]
            })}).catch(err => console.log(err));
        }
});