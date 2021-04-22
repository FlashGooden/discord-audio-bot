//this file will house all commands attached to the play command
// import catSound from '../assets/CatSound.mp3'
const mp3Path = path.resolve(
   "/Users/flashgooden/Desktop/Sparkbox Development/apprentice-repo/discord-audio-bot/assets/CatSound.mp3"
);
const streamPath = "http://www.sample-videos.com/audio/mp3/wave.mp3";
const playMp3 = (roomConnection) => {
   roomConnection
      .play(mp3Path, { volume: 1 })
      .on("finish", () => {
         console.log("Finished playing!");
      });
};

const userInVoiceChannel = (message)=> message.member.voice.channel ? true : false
const roomConnection = (message) => message.member.voice.channel.join()

const play = async (message) => {
   if (userInVoiceChannel(message)) {
      playMp3(await roomConnection(message))
   } else {
      message.reply("You need to join a voice channel first!");
   }
};

export default play;
