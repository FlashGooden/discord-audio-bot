//this file will house all commands attached to the play command
import firebase from "@firebase/app";
import "@firebase/storage";
//xhr2 is needed for asynchronous reference calls
import xhr2 from "xhr2";
global.XMLHttpRequest = xhr2;

const firebaseConfig = {
   apiKey: process.env.FIREBASEAPIKEY,
   authDomain: process.env.FIREBASEAUTHDOMAIN,
   projectId: process.env.FIREBASEPROJECTID,
   storageBucket: "soundwave-bot-14c81.appspot.com",
   messagingSenderId: process.env.FIREBASEMESSAGINGSENDERID,
   appId: process.env.FIREBASEAPPID,
   measurementId: process.env.FIREBASEMEASUREMENTID,
};
//firebase initialization
const firebaseApp = firebase.default.initializeApp(firebaseConfig);
const storage = firebaseApp.storage();
//references to location of files in storage *Case-Sensitive*
const catStorageRef = storage.ref("Cat-Sound.mp3");
const battleStorageRef = storage.ref("soundscrate-battle-narrator-replay.mp3");
const fightStorageRef = storage.ref(
   "soundscrate-battle-narrator-round-1-fight.mp3"
);
const jazzStorageRef = storage.ref("Jazz.m4a");
const helicopterStorageRef = storage.ref("soundscrate-helicopterloop2.mp3");

const firebaseCat = async () =>
   await catStorageRef.getDownloadURL().then((url) => url);
const firebaseBattle = async () =>
   await battleStorageRef.getDownloadURL().then((url) => url);
const fireBaseFight = async () =>
   await fightStorageRef.getDownloadURL().then((url) => url);
const fireBaseJazz = async () =>
   await jazzStorageRef.getDownloadURL().then((url) => url);
const fireBaseHelicopter = async () =>
   await helicopterStorageRef.getDownloadURL().then((url) => url);

// const mp3Path = path.resolve( "/Users/flashgooden/Desktop/Sparkbox Development/apprentice-repo/discord-audio-bot/assets/CatSound.mp3");
export const playInDiscord = async (roomConnection, url) => {
   roomConnection.play(await url(), { volume: 1 }).on("finish", () => {
      console.log("Finished playing!");
   });
};

export const playMp3 = async (roomConnection, arg) => {
   switch (arg) {
      case "cat":
         playInDiscord(roomConnection, firebaseCat);
         break;
      case "replay":
         playInDiscord(roomConnection, firebaseBattle);
         break;
      case "jazz":
         playInDiscord(roomConnection, fireBaseJazz);
         break;
      case "helicopter":
         playInDiscord(roomConnection, fireBaseHelicopter);
         break;
      case "fight":
         playInDiscord(roomConnection, fireBaseFight);
         break;
      default:
         null;
   }
};

const userInVoiceChannel = (message) => !!message.member.voice.channel;
const roomConnection = (message) => message.member.voice.channel.join();

export const play = async (message, arg) => {
   if (userInVoiceChannel(message)) {
      playMp3(await roomConnection(message), arg);
   } else {
      message.reply("You need to join a voice channel first!");
   }
};

export default play;
