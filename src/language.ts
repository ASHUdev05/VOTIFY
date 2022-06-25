import { languageModel } from "../models/language"
import lang from "./lang.json"
import { client } from "./index"
const guildLanguages = {};
const loadLanguages = async () => {
    for (const guild of client.guilds.cache) {
        const guildId = guild[0];
        const result = await languageModel.findOne({ 
            _id: guildId 
        });
        guildLanguages[guildId] = result ? result.language : "english";
    }
};

export const loadLang = loadLanguages;
const setLanguage = (guild, language) => {
    guildLanguages[guild.id] = language ? language.toLowerCase() : "english";
};
export const setLang = setLanguage;
module.exports = (guild, textId) => {
    if(!lang.translations[textId]) {
        throw new Error(`Language file does not contain the following textId: ${textId}`);
    }
    const selectedLanguage = guildLanguages[guild.id] ? guildLanguages[guild.id].toLowerCase() : "english";
    return lang.translations[textId][selectedLanguage];
};