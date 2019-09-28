const Discord = require('discord.js');
const {
          prefix,
          token,
} = require('./config.json');
const ytdl = require('ytdl-core');


const client = new Discord.Client();

const queu = new Map();


client.once('ready', () => {
  console.log('Ready!');
});

client.once('reconnecting', () => {
  console.log('Reconnecting');
});

client.once('disconnect', () => {
  console.log('Disconnect!');
});



client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;


    const serverQueue = queu.get(message.guild.id);

    if (message.content.startsWith(`${prefix}play`)) {
      execute(message, serverQueue);
      return;
    }

    else if (message.content.startsWith(`${prefix}skip`)) {
      skip(message, serverQueu);
      return;
    }

    else if (message.content.startsWith(`${prefix}stop`)) {
      stop(message, serverQueu);
      return;
    }

    else {
      message, channel.send('You need to enter a valid command');

    }

});

async function execute (message, ServerQueue){
  const args = message.content.split(' ');

  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music');
  const permissions = voiceChannel.permissionsfor(message.client.user);

  if (!permission.has('CONNECT') || !permission.has('SPEAK')) {
      return message.channel.send('I need permission to join and speak in your voice channel');

    }




  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.title,
    url: songInfo.video_url,
    };



  if (!serverQueu) {

          const queueConstruct =  {
              textChannel: message.channel,
              voiceChannel: voiceChannel,
              connection: null,
              songs: [],
              volume: 5,
              playing: true,

        };

            queue.set(message.guild.id, queueconstruct);

            queueConstruct.songs.push(song);

            try  {
                      var connection = await voicechannel.join()
                      queueConstruct.connection = connection;
                      play(message.guild, queueConstruct.songs[0]);
                  }

            catch (err) {
                      console.log(err);
                      queue.delete(message.guild.id);
                      return message.channel.send(err);
                  }
          }

    else {
            serverQueue.songs.push(song);
            console.log(serverQueue.songs);
            return message.channel.seng(`${songs.title} has been added to the queue`);

      }
}


function skip(message, serverQueue) {
  if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
  if (!serverQueue) return message.channel.send('There is no song that I could skip');
  serverQueue.connection.dispatcher.end();

}
function stop(message, serverQueue) {
  if (!message.member.voiceChannel) return message.channel.send('You have to be ina voice channel to stop the music!');
  serverQueue.songs = [];
  serverQueue.connectiondispatcher.end();

}

function play (guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', () => {
                    console.log('Music ended!');
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0]);
        })
        .on('error', error => {
            console.error(error);
        });

        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  }


client.login(process.env.BOT_TOKEN);
