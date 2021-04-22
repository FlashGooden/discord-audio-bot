//this file will house all commands attached to the play command

const help = (message)=> {
  message.channel.send('Thank you for using the SoundWave Bot. \n The current features that you can use are \n "!play": to play any sound in the directory \n "!list": to list all songs in the directory \n "!help": well that is what got you here, so type again to see this list of commands')
}

export default help 