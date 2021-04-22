//this file will house all commands attached to the play command
// import catSound from '../assets/CatSound.mp3'
const mp3Path = path.resolve(
   "/Users/flashgooden/Desktop/Sparkbox Development/apprentice-repo/discord-audio-bot/assets/CatSound.mp3"
);
const streamPath = "http://www.sample-videos.com/audio/mp3/wave.mp3";

const play = async (message) => {
   // Only try to join the sender's voice channel if they are in one themselves
   if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const dispatcher = connection.play(streamPath, { volume: 1 });
      dispatcher.on("finish", () => {
         console.log("Finished playing!");
      });
   } else {
      message.reply("You need to join a voice channel first!");
   }
};

export default play;
