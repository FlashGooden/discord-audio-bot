import dotenv from "dotenv";
import Discord from "discord.js";

const client = new Discord.Client();
dotenv.config();

const { BOTPREFIX } = process.env;
const { TOKEN } = process.env;

client.once("ready", () => console.log("ready"));

client.on("message", (message) => {
   if (!message.content.startsWith(BOTPREFIX) || message.author.bot) return;

   const arg = message.content.slice(BOTPREFIX.length).trim().split(" ");
   const command = arg.shift().toLowerCase();

   message.channel.send(`message received using the bot prefix ${BOTPREFIX}`);
   message.channel.send(`responded message in ${message.guild.name}`);
   message.channel.send(`${message.author.username} has triggered a command`);
   message.channel.send(`The command used for this message was ${command}`);
});

client.login(TOKEN);
