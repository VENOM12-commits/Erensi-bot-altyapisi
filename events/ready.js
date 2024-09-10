const client = require("../vencode.js");
const config = require("../config.js");
const { Collection } = require("discord.js")
const fs = require("fs")

client.on("ready", () => {
console.log(`${client.user.tag} Bot aktif!`)
client.user.setPresence({
    status: `${config.durum}`,
});

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./commands/", (err, files) => {
if (err) console.error(err);
console.log(`${files.length} toplam komut yükledim!`);
files.forEach(f => {
let props = require(`../commands/${f}`);
    
console.log(`${props.help.name} yüklendi başarılı venCode gg/vencode`);
    
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {
});
});
});

});