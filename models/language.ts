import m from "mongoose";

const reqString = {
    type: String,
    required: true
};

const languageSchema = new m.Schema({
    _id: reqString,
    language: reqString,
});

export const languageModel = m.model("languages", languageSchema);