const {EmbedBuilder} = require("discord.js");
const { prefix } = require("../config");

exports.run = async (client, message, args) => {

  
 const user = message.mentions.users.first()
 if(!user) return message.channel.send(`**Kimi hackleyeceğini belirt mesala: ${prefix}hackle @kullanıcı**`)
  
  message.channel.send({
    embeds: [
      new EmbedBuilder()
      .setDescription("Hackleniyor... 🧑‍💻**")
    ]
  }).then(msg => {
    setTimeout(() => {
      msg.delete()
    }, 5000)
  })
  

};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "hackle"
};
