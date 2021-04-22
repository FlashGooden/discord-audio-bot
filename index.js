import dotenv from "dotenv";
import Discord from "discord.js";
import play from './Commands/Play.js'
import help from './Commands/Help.js'
import list from './Commands/List.js'

//setup and config 
const client = new Discord.Client();
dotenv.config();

const { BOTPREFIX, TOKEN} = process.env;
const commandList = {play, help, list}

client.once("ready", () => console.log("ready"));

client.on("message", (message) => {
   if (!message.content.startsWith(BOTPREFIX) || message.author.bot) return;

   const arg = message.content.slice(BOTPREFIX.length).trim().split(" ");
   const command = arg.shift().toLowerCase();

   message.channel.send(`${message.author.username} has triggered a command`);

   try {
      //using computed property to call command sent in chatroom
      commandList[command](message, arg[0])
   } catch (error) {
      return message.channel.send(`you need to use a command from the list ${error}`)
   }
});

client.login(TOKEN);
