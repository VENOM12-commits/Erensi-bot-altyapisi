const {EmbedBuilder} = require("discord.js");
const Discord = require("discord.js")
const db = require("croxydb")
exports.run = async (client, message, args) => {
    var kullanıcı = message.author;
    var sebep = args.slice(0).join("  ");
    
      if (!sebep) return message.channel.send(`lüften bir sebep yaz örnek: !afk sebep`
      );
      const row = new Discord.ActionRowBuilder()
      .addComponents(
new Discord.ButtonBuilder()
.setLabel("uzatma evet")
.setStyle(Discord.ButtonStyle.Success)
.setCustomId("he")

      )
message.reply({content: "bak afk oluyon eminmisin", components: [row]}).then(msg => {
    msg.createMessageComponentCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
      let interaction = button
        if (interaction.customId == "he") {
    msg.delete()
        message.channel.send("basarili")
        
      db.set(`afk_${kullanıcı.id}`, sebep);
        }
    })
})
}
exports.conf = {
  aliases: ['yokum']
};

exports.help = {
  name: "afk"
};
