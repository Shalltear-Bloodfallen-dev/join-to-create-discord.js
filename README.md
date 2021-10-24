# Discord.JS V13

This is version only for Discord.JS V13, if you want see JTC for V12 visit page of [original project](https://github.com/Tomato6966/Discord-Join-to-Create)

# Installation | How to use the Bot

1. Install [node.js](https://nodejs.org/) v16 or higher

2. Download this repo and unzip it | or git clone it

3. Install all of the packages with `npm install` | the packages are `npm install node.js discord.js`

4. start the bot with `node index.js`

# Usage - index.js

```js
const Discord = require("discord.js");          //load the Discord.js Library
const client = new Discord.Client({
    intents: [
      Discord.Intents.FLAGS.GUILD_VOICE_STATES
    ]
});            //make a new Client

const config = require("./config.json");        //load in all of the config files

client.on("ready", ()=>console.log("READY"));   //log when the bot gets ready

const jointocreate = require("./jointocreate"); //load the jointocreate.js file
jointocreate(client);                           //call the jointocreate file

client.login(config.TOKEN);                     //start the bot with the bot token
```
