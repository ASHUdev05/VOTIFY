import m from "mongoose";

export const premiumGuildSchema = m.model(
    "premium",
    new m.Schema({
        User: String,
        Expire: Number,
        Permanent: Boolean,
    })
);