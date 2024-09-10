const Discord = require("discord.js");

exports.run = async (client, message, args) => {


  const random = Math.floor(Math.random() * 99) + 1
  
  message.channel.send(`pitonunuz tam **${random}cm**`)




}

  exports.conf = {
  aliases: ['ölç', 'kaç-cm']
};

exports.help = {
  name: "kaçcm"
};