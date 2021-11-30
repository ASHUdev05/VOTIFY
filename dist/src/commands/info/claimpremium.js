"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Command_1 = require("../../structures/Command");
const premium_1 = require("../../../models/premium");
const node_fetch_1 = (0, tslib_1.__importDefault)(require("node-fetch"));
const dayjs_1 = (0, tslib_1.__importDefault)(require("dayjs"));
exports.default = new Command_1.Command({
    name: "claim-premium",
    description: "didn\'t get premium automatically use this command...",
    run: async ({ interaction }) => {
        const botId = `875678983465885706`; // get the client (bot) id
        const uId = await interaction.user.id; // get the author id
        const url = `https://top.gg/api/bots/${botId}/check?userId=${uId}`; // api endpoint
        (0, node_fetch_1.default)(url, { method: "GET", headers: { Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3NTY3ODk4MzQ2NTg4NTcwNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjMyMTQ5MTg3fQ.iGXz3CEau8IxfD5eHFgaOeQRAnTK-wX4PfVZyhaGPzk` } })
            .then((res) => res.text())
            .then((json) => {
            let isVoted = JSON.parse(json).voted;
            if (isVoted !== null && isVoted > 0) {
                interaction.editReply(`Thank you for voting (:`);
                var current = new Date(); //'Mar 11 2015' current.getTime() = 1426060964567
                var followingDay = new Date(current.getTime() + 86400000); // + 1 day in ms
                premium_1.premiumGuildSchema.findOne({
                    User: uId
                }, async (err, data) => {
                    if (data)
                        interaction.channel.send(`You have already got rewards for voting in last 24 hours! What you want double premium? (:


\`Note: If you have voted then you can get a special role in VOTIFY's support server. 
(:\``);
                    else {
                        const Expire = (0, dayjs_1.default)(followingDay).valueOf();
                        new premium_1.premiumGuildSchema({
                            User: uId,
                            Expire,
                            Permanent: false,
                        }).save();
                        return interaction.channel.send(`As a reward we have given you premium {lasts for 24 hours from now!}


\`Note: If you have voted then you can get a special role in VOTIFY's support server. 
(:\``);
                    }
                });
            }
            else {
                interaction.editReply(`You haven't voted yet
        \`Vote now by using '\/vote'\``);
            }
            console.log(isVoted);
        });
    },
});
