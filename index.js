const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
      Discord.Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

const config = require("./config.json");

client.on("ready", ()=>console.log("READY"));

const jointocreate = require("./jointocreate");
jointocreate(client);


client.login(config.TOKEN);
