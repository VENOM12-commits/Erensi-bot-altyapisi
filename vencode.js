const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js");
const config = require("./config.js");
const db = require("croxydb")
const client = new Client({
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember,
  ],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
});

module.exports = client;

require("./events/message.js")
require("./events/ready.js")

// oylama sistemi

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return;
  let message = await interaction.channel.messages.fetch(interaction.message.id)
  if(interaction.customId == "evet") {
const db = require("croxydb")
db.push(`evet_${interaction.message.id}`, interaction.user.id)
interaction.reply({content: "Başarıyla Oyunu **Evet** Olarak Verdin!", ephemeral: true})

const evet = db.get(`evet_${interaction.message.id}`).length;
const hayir = db.get(`hayir_${interaction.message.id}`).length;
const aciklama = db.get(`oylama_${interaction.message.id}`)
const embed = new EmbedBuilder()
.setTitle("Oylama")
.setDescription(`Oylama: **${aciklama}**\n\nEvet: **${evet}**\n\nHayır: **${hayir}**`)
.setColor("#ff0000")
await message.edit({embeds: [embed]})
  }
});
client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return;
  let message = await interaction.channel.messages.fetch(interaction.message.id)
  if(interaction.customId == "hayır") {
const db = require("croxydb")
db.push(`hayir_${interaction.message.id}`, interaction.user.id)
interaction.reply({content: "Başarıyla Oyunu **Hayır** Olarak Verdin!", ephemeral: true})

const evet = db.get(`evet_${interaction.message.id}`).length;
const hayir = db.get(`hayir_${interaction.message.id}`).length;
const aciklama = db.get(`oylama_${interaction.message.id}`)
const embed = new EmbedBuilder()
.setTitle("Godzilla - Oylama Sistemi!")
.setDescription(`Oylama: **${aciklama}**\n\nEvet: **${evet}**\n\nHayır: **${hayir}**`)
.setColor("#ff0000")
await message.edit({embeds: [embed]})
  }
});

// afk sistemi
client.on("messageCreate", async message => {
  const db = require("croxydb");

  if (await db.get(`afk_${message.author.id}`)) {
   
    db.delete(`afk_${message.author.id}`);

    message.channel.send("hoşgeldin artık afk degilsin!");
  }

  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  var sebep = await db.get(`afk_${kullanıcı.id}`);

  if (sebep) {
    message.reply("adam afk kk etiketleme");
  }
});

// küfür engel/agır söz engel
client.on("messageCreate", (message) => {
  const db = require("croxydb")
  let kufur = db.fetch(`kufurengel_${message.guild.id}`)
  if(!kufur) return;
  
  if(kufur) {
  const kufurler = [
    
    "amk",
    "piç",
    "yarrak",
    "oç",
    "göt",
    "amq",
    "yavşak",
    "amcık",
    "amcı",
    "orospu",
    "sikim",
    "sikeyim",
    "aq",
    "mk"
       
  ]
  
if(kufurler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`<@${message.author.id}>, Bu Sunucuda Küfür Engel Sistemi Aktif! `)
}
}
})

// link engel/reklam engel

client.on("messageCreate", (message) => {
  const db = require("croxydb")
  let reklamlar = db.fetch(`reklamengel_${message.guild.id}`)
  if(!reklamlar) return;
  
  if(reklamlar) {

  const linkler = [
    
    ".com.tr",
    ".net",
    ".org",
    ".tk",
    ".cf",
    ".gf",
    "https://",
    ".gq",
    "http://",
    ".com",
    ".gg",
    ".porn",
    ".edu"
       
  ]
  
if(linkler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`<@${message.author.id}>, Bu Sunucuda Reklam Engel Sistemi Aktif! `)
}
}
})

// sayaç sistemi

client.on('guildMemberAdd', async member => {
  let sayac = db.fetch(`sayac_${member.guild.id}`)
  let kalan = sayac.sayi - member.guild.memberCount || '?'
  if(!kalan) return;
  if(!sayac) return;
  
  client.channels.cache.get(sayac.kanal).send("Hoşgeldin **"+member.user.username+"** Seninle Beraber `"+member.guild.memberCount+"` Kişi Olduk, `"+sayac.sayi+"` Kişi Olmamıza Son `"+kalan+"` Kişi Kaldı!")
  
});
client.on('guildMemberRemove', async member => {
  
  let sayac = db.fetch(`sayac_${member.guild.id}`)
  let kalan = sayac.sayi - member.guild.memberCount
  if(!sayac) return;
  
  client.channels.cache.get(sayac.kanal).send("Görüşürüz **"+member.user.username+"** Senin Yüzünden `"+member.guild.memberCount+"` Kişi Olduk!")
  
});

// oto rol  verme ve mesaj
client.on('guildMemberAdd', async member => {
  
  let otorol = db.fetch(`otorol_${member.guild.id}`)
  if(!otorol) return;
  
  client.channels.cache.get(otorol.kanal).send("**"+member.user.tag+"** Kullanıcı Katıldı! Gerekli Rolleri Verdim.")
  member.roles.add(otorol.rol).catch(() => {})
  
});

// sa as sistemi

client.on("messageCreate", (message) => {
  
  let saas = db.fetch(`saas_${message.guild.id}`)
  if(!saas) return;
  
  if(saas) {
  
  let selaamlar = message.content.toLowerCase()  
if(selaamlar === 'sa' || selaamlar === 'slm' || selaamlar === 'sea' || selaamlar === ' selamünaleyküm' || selaamlar === 'Selamün Aleyküm' || selaamlar === 'selam'){

message.channel.send(`<@${message.author.id}> Aleykümselam, Hoşgeldin ☺️`)
}
}
})

// oto cevap

client.on("messageCreate", async message => {
  
  const cmd = db.fetch(`otocevap_${message.content}`)
  if(!cmd) return;
  
  if(cmd) {
    message.reply({ content: `${cmd.answer}` })
  }
  
});

// oto tag

client.on("guildMemberAdd", async member => {
  let ototag = db.get(`ototag_${member.guild.id}`);;
  if (ototag) return member.setNickname(`${ototag} ${member.user.username}`)
})

// bota giriş
client.login(config.token)
console.log("https://discord.gg/vencode")