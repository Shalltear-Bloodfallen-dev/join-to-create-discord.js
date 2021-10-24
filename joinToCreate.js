const db = require(`quick.db`)
const jointocreatemap = new Map();

module.exports = function (client) {
    const description = {
        name: "jointocreate",
        filename: "jointocreate.js",
        version: "4.0"
    }

    console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)

    client.on("voiceStateUpdate", (oldState, newState) => {

  let oldparentname = "unknown"
  let oldchannelname = "unknown"
  let oldchanelid = "unknown"
  if (oldState && oldState.channel && oldState.channel.parent && oldState.channel.parent.name) oldparentname = oldState.channel.parent.name
  if (oldState && oldState.channel && oldState.channel.name) oldchannelname = oldState.channel.name
  if (oldState && oldState.channelId) oldchanelid = oldState.channelId
  let newparentname = "unknown"
  let newchannelname = "unknown"
  let newchanelid = "unknown"
  if (newState && newState.channel && newState.channel.parent && newState.channel.parent.name) newparentname = newState.channel.parent.name
  if (newState && newState.channel && newState.channel.name) newchannelname = newState.channel.name
  if (newState && newState.channelId) newchanelid = newState.channelId
  if (oldState.channelId) {
      if (typeof oldState.channel.parent !== "undefined")  oldChannelName = `${oldparentname}\n\t**${oldchannelname}**\n*${oldchanelid}*`
       else  oldChannelName = `-\n\t**${oldparentname}**\n*${oldchanelid}*`
  }
  if (newState.channelId) {
      if (typeof newState.channel.parent !== "undefined") newChannelName = `${newparentname}\n\t**${newchannelname}**\n*${newchanelid}*`
      else newChannelName = `-\n\t**${newchannelname}**\n*${newchanelid}*`
  }

  if (!oldState.channelId && newState.channelId) {
    // fetch channel id from quick.db
    let id = db.fetch(`jtcchannel_${oldState.guild.id}`); // if you want to use other DB replace this string
    if(newState.channelId !== id) return;  
    jointocreatechannel(newState);   
  }

  if (oldState.channelId && !newState.channelId) {

          if (jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`)) {

            var vc = oldState.guild.channels.cache.get(jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`));

            if (vc.members.size < 1) { 

              jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`); 

              console.log(" :: " + oldState.member.user.username + "#" + oldState.member.user.discriminator + " :: Room deleted")

              return vc.delete(); 
          }
            else {
            }
          }
  }

  if (oldState.channelId && newState.channelId) {
  
    if (oldState.channelId !== newState.channelId) {
      // fetch channel id from quick.db
      let id = db.fetch(`jtcchannel_${oldState.guild.id}`); // if you want to use other DB replace this string

      if(newState.channelId===id) 

      jointocreatechannel(oldState);  

      if (jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`)) {

        var vc = oldState.guild.channels.cache.get(jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`));

        if (vc.members.size < 1) { 

          jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`); 

          console.log(" :: " + oldState.member.user.username + "#" + oldState.member.user.discriminator + " :: Room deleted")

          return vc.delete(); 
      }
      else {
      }
      }
    }
}
  })
    async function jointocreatechannel(user) {

      console.log(" :: " + user.member.user.username + "#" + user.member.user.discriminator + " :: Created a Room")

      await user.guild.channels.create(`${user.member.user.username}'s Room`, {
        type: 'GUILD_VOICE',
        parent: user.channel.parent.id, 
      }).then(async vc => {

        user.setChannel(vc);

        jointocreatemap.set(`tempvoicechannel_${vc.guild.id}_${vc.id}`, vc.id);

        await vc.permissionOverwrites.edit(user.member.id, {
            MANAGE_CHANNELS: true
          });
          await vc.permissionOverwrites.edit(user.guild.id, {
            VIEW_CHANNEL: true
          });
      })
    }
}
